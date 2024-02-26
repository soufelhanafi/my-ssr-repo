import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import {
  CheckboxInputComponent,
  DateInputComponent,
  DatePickerComponent,
  GalleryBannerComponent,
  GalleryComponent,
  GalleryPreviewComponent,
  SelectInputComponent,
  SupplierRatingBoxComponent,
  TextAreaComponent,
  TextInputComponent,
} from './components';
import { AngularMaterialItemsModule } from '../angular-material-items.module';

const SHARED_COMPONENTS = [
  CheckboxInputComponent,
  DateInputComponent,
  DatePickerComponent,
  GalleryComponent,
  GalleryBannerComponent,
  GalleryPreviewComponent,
  SelectInputComponent,
  SupplierRatingBoxComponent,
  SupplierRatingBoxComponent,
  TextAreaComponent,
  TextInputComponent,
];

const SHARED_MODULES = [
  AngularMaterialItemsModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ShareButtonsModule,
  ShareIconsModule,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_COMPONENTS, ...SHARED_MODULES],
})
export class SharedModule {}
