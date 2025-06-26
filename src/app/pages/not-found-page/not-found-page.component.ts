import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import {
  BUTTON_TEXT,
  ICON_PATH,
} from '../../shared/constants/buttons-constants';
import { NOT_FOUND_MESSAGE } from '../../shared/constants/common-constants';

@Component({
  imports: [SvgIconComponent, ButtonComponent],
  selector: 'app-not-found-page',
  styleUrl: './not-found-page.component.scss',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  protected iconPath = ICON_PATH.NOT_FOUND;
  protected readonly buttonText = BUTTON_TEXT.NOT_FOUND;
  protected readonly message = NOT_FOUND_MESSAGE;

  private router = inject(Router);

  public onBackButtonClick(): void {
    void this.router.navigate(['/']);
  }
}
