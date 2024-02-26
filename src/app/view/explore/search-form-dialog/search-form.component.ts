import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatStepper } from '@angular/material/stepper';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DataService } from 'src/service/data.service';
import { SearchService } from 'src/service/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper', { static: false }) private stepper: MatStepper | undefined;
  @ViewChild('group', { static: false }) public group: MatButtonToggleGroup | undefined;
  formGroup: any;
  isLinear = false;
  isDateStepActive = 0;
  years = [2023, 2024, 2025, 2026, 2027];
  months = [
    { text: 'Ianuarie', value: 0 },
    { text: 'Februarie', value: 1 },
    { text: 'Martie', value: 2 },
    { text: 'Aprilie', value: 3 },
    { text: 'Mai', value: 4 },
    { text: 'Iunie', value: 5 },
    { text: 'Iulie', value: 6 },
    { text: 'August', value: 7 },
    { text: 'Septembrie', value: 8 },
    { text: 'Octombrie', value: 9 },
    { text: 'Noiembrie', value: 10 },
    { text: 'Decembrie', value: 11 },
  ];

  days = [
    { text: 'In timpul saptamanii', value: 0 },
    { text: 'In weekend', value: 1 },
  ];

  timeout = 0;
  locationSuggestions: any = [];
  // contains long, lat and countyListed only
  searchQueryLocation: any = {};
  // contains all data coming from server
  selectedLocation: any = {};

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { initialFormGroupInstance: any },
    private searchService: SearchService,
    private ds: DataService,
    private _formBuilder: UntypedFormBuilder,
  ) {
    this.formGroup = this._formBuilder.group({
      locationControl: [''],
      dateType: [1],
      fixedDateControl: [''],
      flexibleDateYearControl: [''],
      flexibleDateMonthControl: [''],
      flexibleDateDayControl: [''],
    });
  }

  ngOnInit() {
    if (this.data.initialFormGroupInstance) {
      this.formGroup = this.data.initialFormGroupInstance.formGroup;
      if (this.data.initialFormGroupInstance.location) {
        this.fetchCityData(this.formGroup.get('locationControl')?.value);
        this.selectLocation(this.data.initialFormGroupInstance.location);
        this.isDateStepActive = 1;
      }
    }
    this.formGroup
      .get('locationControl')
      .valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((change: string) => {
        this.updateLocationSuggestions(change);
      });

    console.log(this.formGroup.get('dateType')?.value);
    // this.fetchAllCityData();
  }

  ngAfterViewInit() {
    this.stepper?.selectionChange.pipe(pluck('selectedIndex')).subscribe((res: number) => {
      this.isDateStepActive = res;
    });

    if (this.isDateStepActive == 1) {
      this.stepper?.next();
    }
  }

  setLocalStorage(cityData: any) {
    localStorage.setItem('allCities', JSON.stringify(cityData.data));
  }

  updateLocationSuggestions(userInput: string) {
    this.fetchCityData(userInput);
  }

  fetchCityData(userInput: string) {
    this.ds.getCityData(userInput).then((res) => {
      this.locationSuggestions = res;
    });
  }

  selectLocation(location: any) {
    this.searchQueryLocation.long = location.lng;
    this.searchQueryLocation.lat = location.lat;
    this.searchQueryLocation.countyListed = location.judet;
    this.selectedLocation = location;
  }

  updateFixedDate(value: any) {
    this.formGroup.get('fixedDateControl')?.setValue(value);
  }

  fetchResults() {
    const dateQuery = {} as any;
    let displayedDate = '';
    if (this.formGroup.value.dateType == 1 && this.formGroup.value.fixedDateControl) {
      const date = this.formGroup.value.fixedDateControl;
      const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      dateQuery.dates = formattedDate;

      displayedDate = formattedDate;
    } else if (
      this.formGroup.value.dateType == 2 &&
      (this.formGroup.value.flexibleDateYearControl ||
        this.formGroup.value.flexibleDateMonthControl ||
        this.formGroup.value.flexibleDateDayControl)
    ) {
      displayedDate = 'data flexibila';
      dateQuery.dates = this.generateDatesArray(
        this.formGroup.value.flexibleDateYearControl,
        this.formGroup.value.flexibleDateMonthControl,
        this.formGroup.value.flexibleDateDayControl,
      ).toString();
    }
    const query = {
      location: this.selectedLocation,
      dateInput: displayedDate,
      data: dateQuery,
    };
    if (
      this.searchQueryLocation.long ||
      this.searchQueryLocation.lat ||
      this.searchQueryLocation.countyListed
    ) {
      query.data = Object.assign(query.data, this.searchQueryLocation);
    }

    this.searchService.emitSearchObject(query);
    this.searchService.emitSearchFormGroup({
      formGroup: this.formGroup,
      location: this.selectedLocation,
    });
  }

  generateDatesArray(year: any, months: any, dayType: any) {
    let datesArray = [] as any;
    if (dayType !== 0 && dayType !== 1) {
      dayType = 2;
    }
    if (months == '') {
      months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }
    if (year == '') {
      year = new Date().getFullYear();
    }
    months.forEach((m: any) => {
      let initialDay = new Date(year, m, 1);
      const lastDay = new Date(year, m + 1);
      lastDay.setDate(lastDay.getDate() - 1);

      while (initialDay <= lastDay) {
        // dayType = 0 -> in timpul saptamanii, dayType = 1 -> weekend (vineri, sambata, duminica), dayType = 2 -> oricand
        if (
          (dayType == 0 && initialDay.getDay() > 0 && initialDay.getDay() < 5) ||
          (dayType == 1 && (initialDay.getDay() > 4 || initialDay.getDay() == 0)) ||
          dayType == 2
        ) {
          const date = new Date(initialDay);
          datesArray.push(
            new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10),
          );
        }
        initialDay = new Date(initialDay.setDate(initialDay.getDate() + 1));
      }
    });

    return datesArray;
  }

  closeSearchForm() {
    this.searchService.emitSearchObject('');
  }

  resetInfo() {
    if (this.isDateStepActive) {
      if (this.formGroup.value.dateType == 1) {
        this.formGroup.get('fixedDateControl')?.reset();
      } else {
        this.formGroup.get('flexibleDateYearControl')?.reset();
        this.formGroup.get('flexibleDateMonthControl')?.reset();
        this.formGroup.get('flexibleDateDayControl')?.reset();
      }
    } else {
      this.selectedLocation = {};
      this.searchQueryLocation = {};
      this.locationSuggestions = [];
      this.formGroup.get('locationControl')?.reset();
    }
  }

  log() {
    console.log(this.formGroup.value.dateType);
  }
}
