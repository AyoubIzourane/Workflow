import { Component } from '@angular/core';
import { LayoutService } from '../../../../src/service/app.layout.service';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
    constructor(public layoutService: LayoutService) { }
 }