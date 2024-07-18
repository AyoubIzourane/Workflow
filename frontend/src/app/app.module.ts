import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { AppLayoutModule as AdminAppLayoutModule} from './admin/bar/app.layout.module';
import { AppLayoutModule as UserAppLayoutModule} from './user/bar/app.layout.module';
import { NotfoundComponent as  AdminNotfoundComponent} from './PageNotFound/notfound/notfound.component';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';


import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent, AdminNotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AdminAppLayoutModule,
        UserAppLayoutModule,
        TableModule,
        CommonModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        FormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        IconService, NodeService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
