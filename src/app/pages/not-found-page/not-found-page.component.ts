import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ICON_PATH } from '../../shared/constants/buttons-constants';

@Component({
  imports: [SvgIconComponent, ButtonComponent],
  selector: 'app-not-found-page',
  styleUrl: './not-found-page.component.scss',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  protected icoPath = ICON_PATH.NOT_FOUND;
  protected readonly buttonText = 'Go to home page';

  private router = inject(Router);

  public onBackButtonClick(): void {
    void this.router.navigate(['/']);
  }
}
