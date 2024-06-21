import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from './UserService';
import { User } from '../admin/users/interface/User';
import { MailService } from './mail/mail.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Role } from 'src/admin/users/interface/Role';

export interface IAuthenticate {
    token: string;
    user: User;
    redirectPage: string;
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private mailService: MailService,
    ) {}

    async authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
        const user = await this.userService.findByEmail(authenticateDto.email);

        if (!user || user.password !== authenticateDto.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = sign({ ...user }, 'secrete', { expiresIn: '1h' });
        const redirectPage = this.getRedirectPage(user.role);

        return { token, user, redirectPage };
    }

    private getRedirectPage(role: Role): string {
        switch (role) {
            case Role.Admin:
                return '/#/admin';
            case Role.User:
                return '/#/user';
            default:
                return '/#/pages/notfound';
        }
    }

    async sendResetToken(email: string): Promise<void> {
        const resetToken = await this.generateResetToken(email);
        const resetLink = `http://localhost:4200/#/auth/reset-password?token=${resetToken}`;
        const subject = 'Password Reset';
        const text = `You've requested to reset your password. Please click on the following link to reset your password: ${resetLink}`;
        await this.mailService.sendMail(email, subject, text);
    }
    
    private async generateResetToken(email: string): Promise<string> {
        const user = await this.userService.findByEmail(email);
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const resetToken = sign({ email: user.email }, 'secret', { expiresIn: '1h' });
    
        // Ensure to save the token in the user record or use a more secure approach
        user.resetToken = resetToken;
        await this.userService.save(user); // Save the token in the user record
    
        return resetToken;
    }
    
    async resetPassword(token: string, newPassword: string): Promise<void> {
        const email = this.decodeResetToken(token);
        const user = await this.userService.findByEmail(email);
    
        if (!user || user.resetToken !== token) { // Check if the token matches the saved token
            throw new NotFoundException('User with the provided token not found');
        }
    
        user.password = newPassword;
        user.resetToken = null; // Clear the reset token
    
        await this.userService.save(user);
    }
    
    private decodeResetToken(token: string): string {
        try {
            const decoded = verify(token, 'secret') as { email: string };
            return decoded.email;
        } catch (error) {
            throw new NotFoundException('Invalid or expired token');
        }
    }
    
}
