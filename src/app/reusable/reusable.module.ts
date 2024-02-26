import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImgFallbackModule } from 'ngx-img-fallback';

import { BannerSingleComponent } from './banner-single/banner-single.component';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { ButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { ImgCardComponent } from './img-card/img-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SupplierComponent } from './supplier-card/supplier.component';
import { WeddingCardComponent } from './wedding-card/wedding-card.component';
import { AngularMaterialItemsModule } from '../angular-material-items.module';
import { DateFormatPipe } from '../pipes/date-format.pipe';

@NgModule({
  declarations: [
    SearchBarComponent,
    BannerSingleComponent,
    SupplierComponent,
    ImgCardComponent,
    WeddingCardComponent,
    BottomNavBarComponent,
    CheckboxListComponent,
    ButtonToggleGroupComponent,
    DateFormatPipe,
  ],
  imports: [CommonModule, RouterModule, AngularMaterialItemsModule, ImgFallbackModule],
  exports: [
    SearchBarComponent,
    BannerSingleComponent,
    SupplierComponent,
    ImgCardComponent,
    WeddingCardComponent,
    BottomNavBarComponent,
    CheckboxListComponent,
    ButtonToggleGroupComponent,
  ],
})
export class ReusableComponentsModule {}
