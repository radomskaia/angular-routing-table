import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  imports: [RouterOutlet, HeaderComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'route-table';
}
