import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { APP_SETTINGS } from '@core/constants';
import { SupplierRequestOfferService } from '@features/services';
import { SupplierRequestQuouteResponseModel } from 'src/app/features/models';
import { environment } from 'src/environments/environment';
import { RequestQuote } from 'src/model/request-quote.model';
import { SupplierDetails } from 'src/model/supplier';

@Component({
  selector: 'app-supplier-request-offer',
  templateUrl: './supplier-request-offer.component.html',
  styleUrls: ['./supplier-request-offer.component.scss'],
})
export class SupplierRequestOfferComponent implements OnInit, OnChanges {
  @Input() supplierData: SupplierDetails | undefined;
  @Input() isMobile: boolean | null;

  showCongratulationsMessage = false;
  requestOfferFormGroup: FormGroup = this.supplierRequestOfferService.buildRequestOfferForm();
  optionList: any;
  dataFromDesktop: any;
  todayDate: string | null;
  todayDay: string;

  readonly APP_SETTINGS = APP_SETTINGS;

  constructor(
    private supplierRequestOfferService: SupplierRequestOfferService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplierData']?.currentValue?.businessServiceType) {
      this.setNumberOfAttendeesRequiredValidator(
        changes['supplierData']?.currentValue?.businessServiceType,
      );
    }

    if (changes['supplierData']?.currentValue?.about?.eventTypes) {
      this.setOptionList();
    }
  }

  ngOnInit(): void {
    this.getDayName();
    this.getTodayDate();
  }

  onSubmit(): void {
    if (this.requestOfferFormGroup.valid) {
      let formValues = this.requestOfferFormGroup.value;

      // TODO: Refactor
      const quouteData: RequestQuote = {
        client: {
          name: formValues.fullName,
          email: formValues.emailAddress,
          phone: formValues.phoneNumber,
        },
        messages: formValues.message,
        eventDetails: {
          date: formValues.eventDate,
          type: formValues.eventType,
          personNumber: formValues.numberOfAttendees,
        },
        workCenterID:
          this.activatedRoute.snapshot.queryParamMap.get('id') || APP_SETTINGS.EMPTY_LINE,
        workCenterName: this.supplierData?.about.title
          ? this.supplierData?.about.title
          : APP_SETTINGS.EMPTY_LINE,
        userID: this.supplierData?.userID ? this.supplierData?.userID : APP_SETTINGS.EMPTY_LINE,
      };

      this.http
        .post<SupplierRequestQuouteResponseModel>(
          `${environment.backendApi}supplier/request-quote`,
          quouteData,
        )
        .subscribe((dataFromResponse: any) => {
          if (dataFromResponse.message === 'Succesful') {
            this.requestOfferFormGroup.reset();
            this.showCongratulationsMessage = true;
          }
        });
    } else {
      this.requestOfferFormGroup.markAllAsTouched();
    }
  }

  // TODO: Refactor
  private getTodayDate(): void {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    this.todayDate = `${this.addLeadingZero(day)}.${this.addLeadingZero(month)}.${year}`;
  }

  // TODO: Refactor
  private getDayName(): void {
    const days = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
    const dateObj = new Date();
    const dayIndex = dateObj.getDay();
    this.todayDay = days[dayIndex];
  }

  private addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // TODO: Refactor
  private setOptionList(): void {
    this.optionList = (this.supplierData?.about.eventTypes || [])
      .map((item: any) => {
        if (item.id && item.name) {
          return { optionValue: item.id, optionText: item.name };
        }
        return null;
      })
      .filter((option: any) => option !== null);
  }

  private setNumberOfAttendeesRequiredValidator(businessServiceType: string): void {
    const formControl: FormControl = this.requestOfferFormGroup.get(
      'numberOfAttendees',
    ) as FormControl;

    if (businessServiceType !== 'Local') {
      formControl.setValidators(Validators.required);
    }
  }
}
