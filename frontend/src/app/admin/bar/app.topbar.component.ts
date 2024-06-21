import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../layout/service/app.layout.service";
import { Router } from '@angular/router';
import { AppConfigComponent } from '../../layout/config/app.config.component';
import { MenuService } from '../../admin/bar/app.menu.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    currentTheme: 'light' | 'dark' = 'light';  // Maintain current theme state

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    private appConfig: AppConfigComponent;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private menuService: MenuService
    ) { 
        this.appConfig = new AppConfigComponent(this.layoutService, this.menuService);
        this.currentTheme = this.layoutService.config.colorScheme === 'dark' ? 'dark' : 'light';  // Set initial theme state
    }

    goToProfile(): void {
        this.router.navigate(['/admin/users/profile']);
    }

    toggleTheme() {
        if (this.currentTheme === 'light') {
            this.changeTheme('mdc-dark-indigo', 'dark');
            this.currentTheme = 'dark';
        } else {
            this.changeTheme('mdc-light-indigo', 'light');
            this.currentTheme = 'light';
        }
    }

    logOut(){
        this.router.navigate(['/auth/login']);
    }

    changeTheme(theme: string, colorScheme: string) {
        this.appConfig.changeTheme(theme, colorScheme);
    }
}
