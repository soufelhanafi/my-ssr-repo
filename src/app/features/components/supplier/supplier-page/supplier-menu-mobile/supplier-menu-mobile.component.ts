import { Component, Input } from '@angular/core';

import { MediaModel } from '@shared/models';
import { GalleryService } from '@shared/services';

import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-menu-mobile',
  templateUrl: './supplier-menu-mobile.component.html',
  styleUrl: './supplier-menu-mobile.component.scss',
})
export class SupplierMenuMobileComponent {
  @Input() activeFigure: MediaModel | null;

  constructor(
    private supplierService: SupplierService,
    private galleryService: GalleryService,
  ) {}

  setComponentMobileActivePopupName(status: string): void {
    window.scrollTo(0, 0);
    this.supplierService.componentMobileActivePopupName.next(status);
    if (status !== 'Galerie') this.galleryService.activeFigure$.next(null);
  }
}
