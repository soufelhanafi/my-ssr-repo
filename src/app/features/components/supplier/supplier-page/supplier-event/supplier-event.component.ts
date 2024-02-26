import { Component, Input } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { AboutWorkCenter, MediaItem } from 'src/model/supplier';

@Component({
  selector: 'app-supplier-event',
  templateUrl: './supplier-event.component.html',
  styleUrls: ['./supplier-event.component.scss'],
})
export class SupplierEventComponent {
  emptyLine: string = APP_SETTINGS.EMPTY_LINE;
  starsArray = new Array(5);
  emptyStarsArray = Array.from(Array(0));

  @Input() isMobile: boolean;
  @Input() supplierAbout: AboutWorkCenter | undefined;
  @Input() supplierPhotos: MediaItem[] | undefined;
  @Input() rating: number = 4.5;
  @Input() supplierFacility:
    | {
        TipulLocalului: {};
        CapacitateRange: {
          minCap: number;
          maxCap: number;
        };
        Facilitati: {};
        ServiciiComplementare: {};
      }
    | undefined;

  public goToLink(link: string | undefined): void {
    window.open(link, '_self');
  }
}
