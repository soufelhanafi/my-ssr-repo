import { Component, Inject, Input, OnInit, OnChanges } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { isMobile } from 'src/service/isMobile';
import { SearchService } from 'src/service/search.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit, OnChanges {
  isMobile = isMobile();

  @Input() supplierTypes = [] as any;
  @Input() activeSupplierTypeIndex = 0 as number;
  selectedType = {} as any;
  filterQuery = {} as any;
  resetRequired = 0 as number;

  constructor(
    public searchService: SearchService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {}

  ngOnInit() {
    if (this.data.supplierTypes) {
      this.supplierTypes = this.data.supplierTypes;
    }
    if (this.data.activeSupplierTypeIndex) {
      this.activeSupplierTypeIndex = this.data.activeSupplierTypeIndex;
    }
    if (this.data.currentFilters) {
      this.filterQuery = this.data.currentFilters;
      this.setExistingFilters();
    }
    if (this.data.currentFilters.businessServiceType) {
      this.activeSupplierTypeIndex = this.supplierTypes.findIndex(
        (x: any) => x.name == this.data.currentFilters.businessServiceType,
      );
      this.selectedType = this.supplierTypes[this.activeSupplierTypeIndex];
    }
  }

  ngOnChanges() {
    this.updateFilters(this.supplierTypes[this.activeSupplierTypeIndex]);
  }

  setExistingFilters() {
    for (const property in this.filterQuery) {
      const filterGroup = this.supplierTypes[this.activeSupplierTypeIndex].data.find(
        (elem: any) => elem.name == property,
      );
      if (filterGroup && this.filterQuery[property]) {
        if (typeof this.filterQuery[property] === 'object') {
          for (const filter in this.filterQuery[property]) {
            const f = filterGroup.data.find((x: any) => x.id == filter);
            if (f) {
              f.value = true;
            }
          }
        }
        if (typeof this.filterQuery[property] === 'string') {
          const f = filterGroup.data.find((x: any) => x.id == this.filterQuery[property]);
          if (f) {
            f.value = true;
          }
        }
      }
    }
  }

  buildFilterQuery() {
    this.selectedType.data.forEach((filterGroup: any) => {
      filterGroup.data.forEach((item: any) => {
        if (item.value === true) {
          if (!this.filterQuery[filterGroup.name]) {
            this.filterQuery[filterGroup.name] = {};
          }
          if (filterGroup.displayFilterMultiSelection == false) {
            this.filterQuery[filterGroup.name] = item.id;
          } else {
            this.filterQuery[filterGroup.name][item.id] = true;
          }
        }
        if (typeof item.value == 'string') {
          this.filterQuery[filterGroup.name] = item.id;
        }
      });
    });
  }

  resetSupplierTypesFilterValues() {
    this.selectedType.data.forEach((filterGroup: any) => {
      filterGroup.data.forEach((item: any) => {
        if (item.value == true) {
          item.value = false;
        }
      });
    });
  }

  // executed when supplierType is changed (Localuri, Formatii, Foto, Bar etc)
  updateFilters(type: any) {
    if (type !== this.selectedType) {
      this.selectedType = type;
      this.filterQuery = {};
      this.filterQuery.businessServiceType = this.selectedType.name;
      this.buildFilterQuery();
      // this.searchService.emitFilterObject(this.filterQuery);
    }
  }

  // executed when selection within filters is changed
  updateSelection(ev: any, filterType: any) {
    if (ev) {
      this.filterQuery[filterType] = ev;
      // this.searchService.emitFilterObject(this.filterQuery);
    }
  }

  closeFilterDialog() {
    this.searchService.emitFilterObject('');
  }

  resetFilters() {
    const tempObj = { businessServiceType: this.filterQuery.businessServiceType };
    this.filterQuery = tempObj;
    this.resetRequired++;
    this.resetSupplierTypesFilterValues();
  }
}
