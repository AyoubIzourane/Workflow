import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/admin/users'] },
                            ]
            },
           
           
            {
                label: 'Workflow',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Workflow', icon: 'pi pi-cog', routerLink: ['/admin/workflow'] },
                    { label: 'Entité primaire', icon: 'pi pi-key', routerLink: ['/admin/entitePrimaire'] },
                ]
            },

        ];
    }
}
