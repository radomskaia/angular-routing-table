import { Component } from '@angular/core';
import { NetworkRoutesComponent } from '../../../features/network-routes/network-routes.component';

@Component({
  imports: [NetworkRoutesComponent],
  selector: 'app-main-page',
  styleUrl: './main-page.component.scss',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {}
