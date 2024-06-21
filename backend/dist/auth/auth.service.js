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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const UserService_1 = require("./UserService");
const mail_service_1 = require("./mail/mail.service");
const Role_1 = require("../admin/users/interface/Role");
let AuthService = class AuthService {
    constructor(userService, mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }
    async authenticate(authenticateDto) {
        const user = await this.userService.findByEmail(authenticateDto.email);
        if (!user || user.password !== authenticateDto.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = (0, jsonwebtoken_1.sign)({ ...user }, 'secrete', { expiresIn: '1h' });
        const redirectPage = this.getRedirectPage(user.role);
        return { token, user, redirectPage };
    }
    getRedirectPage(role) {
        switch (role) {
            case Role_1.Role.Admin:
                return '/#/admin';
            case Role_1.Role.User:
                return '/#/user';
            default:
                return '/#/pages/notfound';
        }
    }
    async sendResetToken(email) {
        const resetToken = await this.generateResetToken(email);
        const resetLink = `http://localhost:4200/#/auth/reset-password?token=${resetToken}`;
        const subject = 'Password Reset';
        const text = `You've requested to reset your password. Please click on the following link to reset your password: ${resetLink}`;
        await this.mailService.sendMail(email, subject, text);
    }
    async generateResetToken(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = (0, jsonwebtoken_1.sign)({ email: user.email }, 'secret', { expiresIn: '1h' });
        user.resetToken = resetToken;
        await this.userService.save(user);
        return resetToken;
    }
    async resetPassword(token, newPassword) {
        const email = this.decodeResetToken(token);
        const user = await this.userService.findByEmail(email);
        if (!user || user.resetToken !== token) {
            throw new common_1.NotFoundException('User with the provided token not found');
        }
        user.password = newPassword;
        user.resetToken = null;
        await this.userService.save(user);
    }
    decodeResetToken(token) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, 'secret');
            return decoded.email;
        }
        catch (error) {
            throw new common_1.NotFoundException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserService_1.UserService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map