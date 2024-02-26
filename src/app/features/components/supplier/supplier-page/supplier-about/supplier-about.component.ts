import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { SupplierDetails } from 'src/model/supplier';

@Component({
  selector: 'app-supplier-about',
  templateUrl: './supplier-about.component.html',
  styleUrls: ['./supplier-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierAboutComponent implements OnChanges {
  @Input() supplierData?: SupplierDetails;
  @Input() isMobile: boolean = false;

  facilities: any;
  faqPreview: any;
  eventTypes: any;
  showMore: boolean = false;

  readonly APP_SETTINGS = APP_SETTINGS;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplierData']?.currentValue) {
      this.supplierData = changes['supplierData'].currentValue;
      console.log(this.supplierData);
      this.faqPreview = this.supplierData?.FAQPreview;
      this.setFacilities();
      this.setEventTypes();
    }
  }

  public showMoreContent(): void {
    this.showMore = !this.showMore;
  }

  private setFacilities(): void {
    this.facilities = this.supplierData?.FacilityPreview.find(
      (item: any) => item.name === 'Facilitati',
    );
  }

  private setEventTypes(): void {
    this.eventTypes = this.supplierData?.about.eventTypes
      ?.map((item: any) => {
        if (item.id && item.name) {
          return { optionValue: item.id, optionText: item.name };
        }
        return null;
      })
      .filter((option: any) => option !== null);
  }
}
