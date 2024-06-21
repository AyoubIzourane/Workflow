import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntitePrimaireComponent } from './entitePrimaire.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EntitePrimaireComponent },
        { path: 'entitePrimaireDetails/:id', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
    ])],
    exports: [RouterModule]
})
export class EntitePrimaireRoutingModule { }
