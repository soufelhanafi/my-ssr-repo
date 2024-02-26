import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import {
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
  HammerModule,
} from '@angular/platform-browser';

import { SharedModule } from '@shared/shared.module';

import {
  SupplierComponent,
  SupplierAboutComponent,
  SupplierCalendarComponent,
  SupplierComponentHeaderComponent,
  SupplierContactComponent,
  SupplierEventComponent,
  SupplierEventBannerComponent,
  SupplierGalleryComponent,
  SupplierMenuMobileComponent,
  SupplierOffersComponent,
  SupplierOrdersComponent,
  SupplierRequestOfferComponent,
  SupplierReviewsComponent,
  SupplierShopComponent,
} from './supplier-page';
import { CalendarUnavailableComponent } from './supplier-page/supplier-calendar/calendar-unavailable/calendar-unavailable.component';
import { GoogleUserReviewCardComponent } from './supplier-page/supplier-reviews/google-user-review-card/google-user-review-card.component';
import { NewReviewBoxComponent } from './supplier-page/supplier-reviews/new-review-box/new-review-box.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { isPlatformBrowser } from "@angular/common";
import { MyHammerConfig } from "@utils/MyHammerConfig";

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierAboutComponent,
    SupplierCalendarComponent,
    SupplierContactComponent,
    SupplierEventComponent,
    SupplierEventBannerComponent,
    SupplierGalleryComponent,
    SupplierMenuMobileComponent,
    SupplierComponentHeaderComponent,
    SupplierOffersComponent,
    SupplierOrdersComponent,
    SupplierRequestOfferComponent,
    SupplierReviewsComponent,
    SupplierShopComponent,
    GoogleUserReviewCardComponent,
    NewReviewBoxComponent,
    CalendarUnavailableComponent,
  ],
  imports: [SharedModule, SupplierRoutingModule, HammerModule],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}]
})
export class SupplierModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(APP_ID) private appId: string) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('This is a browser platform');
    } else {
      console.log('This is a server platform');
    }
  }
}
