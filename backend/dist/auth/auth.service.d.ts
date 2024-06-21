import { UserService } from './UserService';
import { User } from '../admin/users/interface/User';
import { MailService } from './mail/mail.service';
import { AuthenticateDto } from './dto/authenticate.dto';
export interface IAuthenticate {
    token: string;
    user: User;
    redirectPage: string;
}
export declare class AuthService {
    private userService;
    private mailService;
    constructor(userService: UserService, mailService: MailService);
    authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate>;
    private getRedirectPage;
    sendResetToken(email: string): Promise<void>;
    private generateResetToken;
    resetPassword(token: string, newPassword: string): Promise<void>;
    private decodeResetToken;
}
