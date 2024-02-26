import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { MediaModel } from '@shared/models';
import { GalleryService } from '@shared/services';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPreviewComponent implements OnInit, OnDestroy {
  @Input() gallery: MediaModel[] = [];
  @Input() activeFigure: MediaModel | null = null;

  activeFigureIndex: number | null = APP_SETTINGS.FIRST_INDEX;
  disabledPrevArrow: boolean = false;
  disabledNextArrow: boolean = false;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.setActiveFigureIndex();
    this.setDisabledArrows();
  }

  ngOnDestroy(): void {
    this.galleryService.activeFigure$.next(null);
    this.activeFigureIndex = null;
  }

  onArrowClick(step: 'previous' | 'next'): void {
    this.activeFigureIndex = this.activeFigureIndex! + (step === 'previous' ? -1 : +1);
    this.setDisabledArrows();

    if (this.gallery[this.activeFigureIndex]) {
      this.galleryService.activeFigure$.next(this.gallery[this.activeFigureIndex]);
    }
  }

  private setDisabledArrows(): void {
    this.disabledPrevArrow = this.activeFigureIndex === APP_SETTINGS.FIRST_INDEX;
    this.disabledNextArrow = this.activeFigureIndex === this.gallery.length - 1;
  }

  private setActiveFigureIndex(): void {
    this.activeFigureIndex = this.gallery.findIndex(
      (figure) => figure.linkSrc === this.activeFigure?.linkSrc,
    );
  }
}
