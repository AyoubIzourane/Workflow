import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../demo/service/user.service';
import { LayoutService } from '../../../service/app.layout.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.userService.resetPassword(this.token, this.newPassword).subscribe(
      (response: any) => {
        this.success = 'Password reset successfully. You can now log in with your new password.';
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 3000);
      },
      (error: any) => {
        this.error = 'Failed to reset password. Please try again.';
        this.success = '';
      }
    );
  }
}
