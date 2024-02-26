import { Component, Input } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { GalleryService } from '@shared/services';

import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-component-header',
  templateUrl: './supplier-component-header.component.html',
  styleUrl: './supplier-component-header.component.scss',
})
export class SupplierComponentHeaderComponent {
  emptyLine: string = APP_SETTINGS.EMPTY_LINE;
  @Input() componentMobileActivePopupName: string;

  constructor(
    private supplierService: SupplierService,
    public galleryService: GalleryService,
  ) {}

  setComponentMobileActivePopupName(status: string): void {
    this.supplierService.componentMobileActivePopupName.next(status);
    if (status !== 'Galerie') this.galleryService.activeFigure$.next(null);
  }
}
