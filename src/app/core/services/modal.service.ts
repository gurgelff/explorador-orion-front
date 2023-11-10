import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/theme/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  /**
   * Exibe uma caixa de diálogo modal.
   *
   * @param data - Um objeto com informações para a caixa de diálogo.
   *   - feedback: 'success' ou 'error'
   *   - title: O título da caixa de diálogo.
   *   - message: A mensagem a ser exibida na caixa de diálogo.
   *   - onClick (opcional): Uma função a ser executada após o fechamento da caixa de diálogo.
   */
  public showDialog(data: {
    feedback: 'success' | 'error';
    title: string;
    message: string;
    onClick?: () => void;
  }): void {
    // Abre a caixa de diálogo usando o MatDialog do Angular Material.
    const dialogRef = this.dialog.open(DialogComponent, {
      data,
    });

    // Observa o fechamento da caixa de diálogo e executa a função onClick (se fornecida).
    dialogRef.afterClosed().subscribe(() => {
      if (data.onClick) {
        data.onClick();
      }
    });
  }
}
