import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-message-info-status',
  templateUrl: './message-info-status.component.html',
  styleUrls: ['./message-info-status.component.scss'],
})
export class MessageInfoStatusComponent implements OnInit {
  public imageSource?: string;
  public buttonLabel?: string;

  statusData?: { sent: boolean; workCenterName?: string };
  statusMessage?: string;
  messageTitle?: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public dataObj: { sent: boolean; workCenterName?: string },
    private readonly matBottomSHeet: MatBottomSheet,
  ) {
    this.statusData = dataObj;
  }

  public ngOnInit(): void {
    if (this.statusData && this.statusData.sent) {
      this.buttonLabel = 'Inapoi';
      this.imageSource = '/assets/images/sparkling_wine_succes.svg';
      this.messageTitle = 'Mesaj trimis!';
      this.statusMessage =
        'Felicitari! Mesaj trimis cu succes catre ' +
        this.statusData.workCenterName +
        '. Verifica emailul pentru confirmare.';
    } else {
      this.imageSource = '/assets/images/something_went_wrong.svg';
      this.messageTitle = 'Eroare';
      this.statusMessage = 'Something went wrong, please make sure your filed out and try again';
      this.buttonLabel = 'Incearca din nou';
    }
  }

  public clickOnButton() {
    this.matBottomSHeet.dismiss();
  }
}
