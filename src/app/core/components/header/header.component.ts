import { Component } from '@angular/core';
import { PAGE_AUTHOR } from '../../../shared/constants/common-constants';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected author = PAGE_AUTHOR;
}
