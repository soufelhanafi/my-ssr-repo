import { Component, Input } from '@angular/core';

import { MediaModel } from '@shared/models';

@Component({
  selector: 'app-supplier-gallery',
  templateUrl: './supplier-gallery.component.html',
  styleUrls: ['./supplier-gallery.component.scss'],
})
export class SupplierGalleryComponent {
  @Input() gallery: MediaModel[] = [];
}
