import { Component, Input } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { SupplierGoogleReviewsModel } from '@features/models';

@Component({
  selector: 'app-google-user-review-card',
  templateUrl: './google-user-review-card.component.html',
  styleUrl: './google-user-review-card.component.scss',
})
export class GoogleUserReviewCardComponent {
  @Input() googleReviews?: SupplierGoogleReviewsModel[];
  @Input() isMobile: boolean = false;

  readonly APP_SETTINGS = APP_SETTINGS;

  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
