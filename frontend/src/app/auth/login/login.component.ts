import { Component } from '@angular/core';
import { LayoutService } from '../../../../src/service/app.layout.service';
import { User } from '../../demo/interfaces/User';
import { Role } from '../../demo/interfaces/Role';

import { UserService } from '../../demo/service/user.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    user: User = { id: 0, email: '', password: '',role: Role.User  };


    valCheck: string[] = ['remember'];

    password!: string;

    loginError: boolean = false;
    
    constructor(public layoutService: LayoutService, private authService: UserService, private router: Router) { }
    
    login() {
        this.authService.login(this.user).subscribe(
            (response: any) => { // Cast the response to any for now
              console.log('Login successful:', response);
        
              if (response && response.token && response.redirectPage) {
                console.log('Redirecting to:', response.redirectPage);
                window.location.href = response.redirectPage;
              } else {
                console.error('Incomplete response:', response);
              }
            },
            (error) => {
              console.error('Login failed:', error);
              this.loginError = true;
            }
          );
      }
}
