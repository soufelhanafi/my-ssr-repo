import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
})
export class PhotoGalleryComponent {
  public photoTab = true;
  public videoTab = false;

  constructor(
    private readonly matBottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public photosAndVideos: any,
  ) {}

  goBack() {
    this.matBottomSheet.dismiss();
  }
}
