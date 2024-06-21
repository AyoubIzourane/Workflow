import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VersionComponent } from './version.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VersionComponent },
	])],
	exports: [RouterModule]
})
export class VersionRoutingModule { }
