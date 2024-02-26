import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CookieService } from 'src/service/cookie.service';

import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookie-modal.component.html',
  styleUrls: ['./cookie-modal.component.scss'],
})
export class CookieModalComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CookieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFrom: any,
    private readonly cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('COOKIE MODAL IS OPENED');
  }

  acceptAllCookies(): void {
    this.dialogRef.close();
  }

  public openCookie() {
    this.dialog.open(PdfViewerComponent);
  }

  acceptEssentialCookies() {}

  // openPreferencesModal(): void {
  //   this.dialog.open(CookiesPreferencesComponent)
  // }
}
