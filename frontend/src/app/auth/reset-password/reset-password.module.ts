import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';


import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        ButtonModule,
        FormsModule,
        PasswordModule
    ],
    declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
