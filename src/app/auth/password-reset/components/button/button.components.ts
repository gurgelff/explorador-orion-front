import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title Basic buttons
 */
@Component({
  selector: 'app-button',
  templateUrl: 'button.components.html',
  styleUrls: ['button.components.scss'],
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
  ],
})

export class ButtonComponent {
  // rever constructor
  constructor() {
    this.btnName = '';
    this.isDisabled = false;
    this.callbackFunction = () => {
      return null;
    };
  }

  @Input() btnName: string;
  @Input() isDisabled: boolean;
  @Input() callbackFunction: () => void;

  callCallback() {
    if (this.callbackFunction) {
      this.callbackFunction();
    }
  }
}
