import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-svg-icon',
  styleUrl: './svg-icon.component.scss',
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {
  protected role = '';
  protected _alt = '';
  @Input() public path = '';

  @Input()
  public set altAttr(value: string) {
    if (value) {
      this.role = 'img';
      this._alt = value;
    }
  }

  @Input() public className = '';
}
