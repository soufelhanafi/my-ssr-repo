import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { SupplierType } from 'src/model/supplier';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnChanges {
  @Input() supplierTypes: any;
  @Input() activeIndex: number = 0;
  @Output() selectedType = new EventEmitter<any>();
  type: SupplierType | any;

  ngOnChanges() {
    this.selectSupplierType(this.supplierTypes[this.activeIndex]);
  }

  selectSupplierType(type: SupplierType) {
    this.supplierTypes.forEach((element: any) => {
      element.isActive = false;
    });
    if (type) {
      // console.log(type, 'TYPE')
      type.isActive = true;
      this.selectedType.emit(type);
    }
  }
}
