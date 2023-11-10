import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      feedback: 'success' | 'error';
      title: string;
      message: string;
      onClick?: () => void;
    }
  ) {}

  public cancel(): void {
    this.dialogRef.close();
  }

  public onClick(): void {
    if (this.data.onClick) {
      this.data.onClick();
    }
    this.cancel();
  }
}
