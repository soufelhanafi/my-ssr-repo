import { Component, Input } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';

@Component({
  selector: 'app-new-review-box',
  templateUrl: './new-review-box.component.html',
  styleUrl: './new-review-box.component.scss',
})
export class NewReviewBoxComponent {
  @Input() googleRating?: number;
  @Input() supplierTitle?: string = APP_SETTINGS.EMPTY_LINE;
}
