import { Component, Input } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { SupplierGoogleReviewsModel } from '@features/models';

@Component({
  selector: 'app-supplier-reviews',
  templateUrl: './supplier-reviews.component.html',
  styleUrls: ['./supplier-reviews.component.scss'],
})
export class SupplierReviewsComponent {
  @Input() isMobile: boolean = false;
  @Input() googleRating?: number;
  @Input() googleReviews?: SupplierGoogleReviewsModel[];
  @Input() supplierTitle?: string = APP_SETTINGS.EMPTY_LINE;
}
