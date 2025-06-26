import { Component } from '@angular/core';
import { NetworkRouteTableComponent } from '../../../features/network-route-table/network-route-table.component';

@Component({
  imports: [NetworkRouteTableComponent],
  selector: 'app-main-page',
  styleUrl: './main-page.component.scss',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {}
