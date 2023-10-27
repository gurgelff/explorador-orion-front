import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponsePasswordReset } from 'src/app/core/models/response-password-forgot';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IResponsePasswordReset
  ) {}

  /**
   * Este método é usado para fechar o modal, removendo-o da interface do usuário.
   *
   */
  public cancel(): void {
    this.dialogRef.close();
  }
}
