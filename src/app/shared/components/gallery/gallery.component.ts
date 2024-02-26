import { Component, Input } from '@angular/core';

import { SupplierService } from '@features/components/supplier/services/supplier.service';
import { MediaModel } from '@shared/models';
import { GalleryService } from '@shared/services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  @Input() gallery: MediaModel[] = [];

  constructor(
    private galleryService: GalleryService,
    private supplierService: SupplierService,
  ) {}

  onFigureClick(figure: MediaModel): void {
    this.galleryService.activeFigure$.next(figure);
    this.supplierService.componentMobileActivePopupName.next('Galerie');
  }
}
