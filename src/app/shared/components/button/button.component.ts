import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { BUTTON_TYPE } from '../../constants/buttons-constants';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
const TEXT_BUTTON_CLASS = 'textButton';
const BUTTON_CLASS = 'button';

@Component({
  imports: [NgClass, NgIf, SvgIconComponent],
  selector: 'app-button',
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() public iconPath?: string;
  @Input() public disabled = false;
  @Input() public type: ButtonType = BUTTON_TYPE.BUTTON;
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
    const textButtonClass = !this.iconPath ? TEXT_BUTTON_CLASS : '';

    return [BUTTON_CLASS, ...classNamesArray, textButtonClass];
  }
}
