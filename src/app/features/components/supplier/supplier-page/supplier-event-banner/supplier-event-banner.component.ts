import { Component, Input } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { AboutWorkCenter, MediaItem } from 'src/model/supplier';

@Component({
  selector: 'app-supplier-event-banner',
  templateUrl: './supplier-event-banner.component.html',
  styleUrls: ['./supplier-event-banner.component.scss'],
})
export class SupplierEventBannerComponent {
  emptyLine: string = APP_SETTINGS.EMPTY_LINE;
  rating: number = 3.5;
  starsArray = new Array(5);
  emptyStarsArray = Array.from(Array(0));

  @Input() isMobile: boolean;
  @Input() supplierAbout: AboutWorkCenter | undefined;
  @Input() supplierPhotos: MediaItem[] | undefined;
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
