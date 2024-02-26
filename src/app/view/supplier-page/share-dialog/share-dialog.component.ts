import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
})
export class ShareDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { link: string },
    private readonly snackBar: MatSnackBar,
  ) {}

  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    document.execCommand('copy');
    this.snackBar.open('Linkul a fost copiat', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
