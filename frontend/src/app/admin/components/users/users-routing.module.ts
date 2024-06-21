import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UsersComponent },
        { path: 'userDetails/:id', loadChildren: () => import('./details/user-details.module').then(m => m.UserDetailsModule) },
		{ path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
