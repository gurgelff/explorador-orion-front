import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/theme/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog, private router: Router) {}

  /**
 * Exibe um modal de sucesso com a resposta fornecida e redireciona para a página de login após o fechamento do modal.
 *
 * @param response A mensagem de resposta a ser exibida no modal de sucesso.
 */
  showSuccessDialog(response: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { response: response } 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
