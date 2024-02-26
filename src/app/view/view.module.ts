import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';

import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { DataService } from 'src/service/data.service';

import { CookieModalComponent } from './cookie-modal/cookie-modal.component';
import { CookiesPreferencesComponent } from './cookies-preferences/cookies-preferences.component';
import { ExploreComponent } from './explore/explore.component';
import { FilterBarComponent } from './explore/filter-bar/filter-bar.component';
import { FilterDialogComponent } from './explore/filter-dialog/filter-dialog.component';
import { SearchFormDialogComponent } from './explore/search-form-dialog/search-form.component';
import { SuplierListComponent } from './explore/suplier-list/suplier-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { CookieComponent } from './policy/cookie/cookie.component';
import { PrivacyComponent } from './policy/privacy/privacy.component';
import { TermsAndConditionsComponent } from './policy/terms-and-conditions/terms-and-conditions.component';
import { ShowMoreLessComponent } from './show-more-less/show-more-less.component';
import { BottomNavigationComponent } from './supplier-page/bottom-navigation/bottom-navigation.component';
import { CalendarComponent } from './supplier-page/calendar/calendar.component';
import { MessageInfoStatusComponent } from './supplier-page/message-info-status/message-info-status.component';
import { OfferRequestComponent } from './supplier-page/offer-request/offer-request.component';
import { PhotoGalleryComponent } from './supplier-page/photo-gallery/photo-gallery.component';
import { RejectPublishDialogBoxComponent } from './supplier-page/reject-publish-dialog-box/reject-publish-dialog-box.component';
import { ShareDialogComponent } from './supplier-page/share-dialog/share-dialog.component';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { AngularMaterialItemsModule } from '../angular-material-items.module';
import { ReusableComponentsModule } from '../reusable/reusable.module';

@NgModule({
  declarations: [
    ExploreComponent,
    SupplierPageComponent,
    FilterBarComponent,
    SuplierListComponent,
    UnderConstructionComponent,
    SearchFormDialogComponent,
    FilterDialogComponent,
    OfferRequestComponent,
    CalendarComponent,
    PhotoGalleryComponent,
    MessageInfoStatusComponent,
    BottomNavigationComponent,
    ShareDialogComponent,
    CookieModalComponent,
    CookiesPreferencesComponent,
    FavoritesComponent,
    PdfViewerComponent,
    ShowMoreLessComponent,
    CookieComponent,
    PrivacyComponent,
    TermsAndConditionsComponent,
    RejectPublishDialogBoxComponent,
  ],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    HammerModule,
    // NgxImageSwiperModule,
    CommonModule,
    HomeModule,
    ReusableComponentsModule,
    ReactiveFormsModule,
    AngularMaterialItemsModule,
    MatSelectModule,
    ShareModule,
    ShareButtonsModule,
    ShareIconsModule,
  ],
  exports: [HomeComponent, ExploreComponent],
})
export class ViewModule {}
