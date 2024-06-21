import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'forgot-password', loadChildren: () => import('./forgotpassword/forgot-password.module').then(m => m.AuthModule) },
        { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
