import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-publish-dialog-box',
  templateUrl: './reject-publish-dialog-box.component.html',
  styleUrls: ['./reject-publish-dialog-box.component.scss'],
})
export class RejectPublishDialogBoxComponent {
  rejectReason: string = '';
  @ViewChild('rejectReason') textarea: ElementRef;
  constructor(public dialogRef: MatDialogRef<RejectPublishDialogBoxComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onRejectClick(): void {
    this.rejectReason = this.textarea.nativeElement.value;
    console.log(this.rejectReason);

    this.dialogRef.close(this.rejectReason);
  }
}
