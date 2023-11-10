import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogComponent } from 'src/app/theme/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private router: Router) {}

  private closeDialog(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showDialog(data: {
    feedback: 'success' | 'error';
    title: string;
    message: string;
    onClick?: () => void;
  }): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.closeDialog();
      });
  }
}
