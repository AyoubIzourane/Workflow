import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthService } from './auth.service';
import { UserService } from './UserService';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(res: any, authenticateDto: AuthenticateDto): Promise<any>;
    forgotPassword(res: any, body: {
        email: string;
    }): Promise<any>;
    resetPassword(res: any, body: {
        token: string;
        newPassword: string;
    }): Promise<any>;
    profile(req: any, res: any): Promise<any>;
}
