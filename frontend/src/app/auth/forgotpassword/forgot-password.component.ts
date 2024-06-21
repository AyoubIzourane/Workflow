import { Component } from '@angular/core';
import { UserService } from '../../demo/service/user.service';
import { LayoutService } from '../../../service/app.layout.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  error: string = '';
  success: string = '';

  constructor(private userService: UserService, public layoutService: LayoutService) {}

  onSubmit() {
    this.userService.forgotPassword(this.email).subscribe(
      (response: any) => {
        this.success = 'Password reset link sent to your email.';
        this.error = '';
      },
      (error: any) => {
        this.error = 'Failed to send password reset link. Please try again.';
        this.success = '';
      }
    );
  }
}
