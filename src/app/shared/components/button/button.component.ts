import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import type { BUTTON_TYPE } from '../../constants/buttons-constants';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];

@Component({
  imports: [NgClass, NgIf, SvgIconComponent],
  selector: 'app-button',
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() public iconPath?: string;
  @Input() public disabled = false;
  @Input() public type: ButtonType = 'button';
  @Input() public ariaLabel = '';
  @Input() public className = '';
  @Output() public clicked = new EventEmitter<Event>();

  public handleClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  public get classes(): string[] {
    const classNamesArray = this.className.split(' ');
    const textButtonClass = !this.iconPath ? 'textButton' : '';

    return ['button', ...classNamesArray, textButtonClass];
  }
}
