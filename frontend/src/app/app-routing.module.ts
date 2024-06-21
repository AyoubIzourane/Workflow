import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './PageNotFound/notfound/notfound.component';
import { AppLayoutComponent as AdminAppLayoutComponent} from "./admin/bar/app.layout.component";
import { AppLayoutComponent as UserAppLayoutComponent} from "./user/bar/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'admin', component: AdminAppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./admin/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'workflow', loadChildren: () => import('./admin/components/workflow/workflow.module').then(m => m.WorkflowModule) },
//                    { path: 'version', loadChildren: () => import('./admin/components/workflow/version/version.module').then(m => m.VersionModule) },
                    { path: 'users', loadChildren: () => import('./admin/components/users/users.module').then(m => m.UsersModule) },
                    { path: 'entitePrimaire', loadChildren: () => import('./admin/components/entitePrimaire/entitePrimaire.module').then(m => m.EntitePrimaireModule) },

                ],
            },

            {
                path: 'user', component: UserAppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./user/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'profile', loadChildren: () => import('./user/components/profile/profile.module').then(m => m.ProfileModule) },
                    { path: 'uikit', loadChildren: () => import('./user/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./user/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'blocks', loadChildren: () => import('./user/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./user/components/pages/pages.module').then(m => m.PagesModule) },

                ],
            },

            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
