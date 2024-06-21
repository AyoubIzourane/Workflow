import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: WorkflowComponent },
		{ path: 'workflowDetails/:id', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
		{ path: 'version/:id', loadChildren: () => import('./version/version.module').then(m => m.VersionModule) },
	])],
	exports: [RouterModule]
})
export class WorkflowRoutingModule { }
