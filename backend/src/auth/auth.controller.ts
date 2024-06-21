import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthService, IAuthenticate } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { User } from 'src/admin/users/interface/User';
import { UserService } from './UserService';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            const { token, redirectPage } = await this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json({ token, redirectPage });
        } catch (error) {
            console.error('Internal server error:', error);
            if (error instanceof UnauthorizedException) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }

    @Post('forgot-password')
    async forgotPassword(@Res() res, @Body() body: { email: string }) {
        try {
            await this.authService.sendResetToken(body.email);
            return res.status(HttpStatus.OK).json({ message: 'Reset token sent successfully' });
        } catch (error) {
            console.error('Failed to send reset token:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to send reset token' });
        }
    }

    @Post('reset-password')
    async resetPassword(@Res() res, @Body() body: { token: string, newPassword: string }) {
        try {
            await this.authService.resetPassword(body.token, body.newPassword);
            return res.status(HttpStatus.OK).json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error('Password reset failed:', error);
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'User with the provided token not found' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to reset password' });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('current-user')
    async profile(@Req() req, @Res() res) {
        try {
            console.log('Requesting current user:', req.user); // Log user information from JWT token
            const user = await this.userService.getCurrentUser(req.user.userId); // Fetch the full user details using userId
            if (!user) {
                console.error('User not found'); // Log if user is not found
                throw new NotFoundException('User not found');
            }
            console.log('Retrieved user:', user); // Log retrieved user
            return res.status(HttpStatus.OK).json(user); // Return the full user object
        } catch (error) {
            console.error('Error retrieving user:', error); // Log any errors
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve user' });
        }
    }
    

}
