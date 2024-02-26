import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/service/data.service';
import { isMobile } from 'src/service/isMobile';
import { SearchService } from 'src/service/search.service';

import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SearchFormDialogComponent } from './search-form-dialog/search-form.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  isMobile = isMobile();
  subscription: any;
  locationInput: string = '';
  dateInput: string = '';
  supplierTypes: any = [];
  supplierList: any = [];
  searchQuery: any = {};
  filterQuery: any = {};
  currentFilters: any = {};
  savedSearchFormGroup: any = null;
  savedFilterFormGroup: any = null;
  activeSupplierTypeIndex: number = 0;
  queryParams: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private ds: DataService,
    public searchBottomSheet: MatBottomSheet,
    public filteringBottomSheet: MatBottomSheet,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  // activatedRoute.queryParamMap.
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((item) => {
      let fullParams: any = item;
      this.queryParams = JSON.parse(JSON.stringify(fullParams.params));
      this.filterQuery = this.ds.parseHttpParams(this.queryParams, {});
      this.fetchSuppliers();
    });

    this.initSupplierTypes();

    // initialise supplier types (filter bar)
    this.searchService.getSearchObjectEmitter().subscribe((item) => {
      this.updateSupplierList(item);
    });

    // store search query
    this.searchService
      .getSearchFormGroupEmitter()
      .subscribe((item) => (this.savedSearchFormGroup = item));

    // watch for filter query updates
    this.searchService.getFilterObjectEmitter().subscribe((item) => {
      this.filterSuppliers(item);
    });
  }

  initSupplierTypes() {
    this.ds.getSupplierTypes().then((response: any) => {
      this.supplierTypes = response;
      if (this.queryParams.businessServiceType) {
        this.activeSupplierTypeIndex = this.supplierTypes.findIndex(
          (item: any) => item.name == this.queryParams.businessServiceType,
        );
      }
    });
  }

  fetchSuppliers() {
    const fullQuery = { ...this.filterQuery, ...this.searchQuery };
    let params = this.ds.prepareHttpParams(fullQuery);
    this.ds.getSuppliers(params).then((response) => {
      this.supplierList = response as any;
    });
  }

  updateSupplierList(sQ: any) {
    if (Object.keys(sQ).length > 0) {
      const { cityInput, dateInput, ...sQData } = sQ;
      this.locationInput = sQ.location?.nume ?? 'oriunde';
      if (cityInput) {
        this.locationInput = sQ.cityInput;
      }
      if (dateInput) {
        this.dateInput = sQ.dateInput;
      }
      this.dateInput = sQ.dateInput ?? 'oricand';
      if (!sQ.data) {
        sQ.data = sQData;
      }
      this.searchQuery = { ...sQ.data, cityInput: this.locationInput, dateInput: this.dateInput };
      this.fetchSuppliers();
    }
    this.searchBottomSheet.dismiss();
  }

  filterSuppliers(fQ: any) {
    if (Object.keys(fQ).length > 0) {
      this.filterQuery = fQ;
      this.fetchSuppliers();
    }
    this.filteringBottomSheet.dismiss();
  }

  openSearchDialog() {
    this.searchBottomSheet.open(SearchFormDialogComponent, {
      panelClass: 'search-form-modal',
      data: { initialFormGroupInstance: this.savedSearchFormGroup },
    });
  }

  openFilterDialog(): void {
    this.filteringBottomSheet.open(FilterDialogComponent, {
      data: {
        supplierTypes: this.supplierTypes,
        activeSupplierTypeIndex: this.activeSupplierTypeIndex,
        currentFilters: this.filterQuery,
      },
    });
  }

  filterSupplierTypesChange(obj: any) {
    if (obj) {
      if (obj.name !== this.filterQuery.businessServiceType) {
        this.activeSupplierTypeIndex = this.supplierTypes.findIndex(
          (x: any) => x.name === obj.name,
        );
        this.filterQuery = { businessServiceType: obj.name };
        this.router.navigate(['/explore'], { queryParams: { ...this.filterQuery } });
      }
    }
  }
}
