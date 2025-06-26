import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { PAGE_TITLE } from './shared/constants/common-constants';

@Component({
  imports: [RouterOutlet, HeaderComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = PAGE_TITLE;
}
