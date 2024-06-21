"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const authenticate_dto_1 = require("./dto/authenticate.dto");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./jwt.guard");
const UserService_1 = require("./UserService");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(res, authenticateDto) {
        try {
            const { token, redirectPage } = await this.authService.authenticate(authenticateDto);
            return res.status(common_1.HttpStatus.OK).json({ token, redirectPage });
        }
        catch (error) {
            console.error('Internal server error:', error);
            if (error instanceof common_1.UnauthorizedException) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }
    async forgotPassword(res, body) {
        try {
            await this.authService.sendResetToken(body.email);
            return res.status(common_1.HttpStatus.OK).json({ message: 'Reset token sent successfully' });
        }
        catch (error) {
            console.error('Failed to send reset token:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to send reset token' });
        }
    }
    async resetPassword(res, body) {
        try {
            await this.authService.resetPassword(body.token, body.newPassword);
            return res.status(common_1.HttpStatus.OK).json({ message: 'Password reset successfully' });
        }
        catch (error) {
            console.error('Password reset failed:', error);
            if (error instanceof common_1.NotFoundException) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'User with the provided token not found' });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to reset password' });
        }
    }
    async profile(req, res) {
        try {
            console.log('Requesting current user:', req.user);
            const user = await this.userService.getCurrentUser(req.user.userId);
            if (!user) {
                console.error('User not found');
                throw new common_1.NotFoundException('User not found');
            }
            console.log('Retrieved user:', user);
            return res.status(common_1.HttpStatus.OK).json(user);
        }
        catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve user' });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, authenticate_dto_1.AuthenticateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('current-user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        UserService_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map