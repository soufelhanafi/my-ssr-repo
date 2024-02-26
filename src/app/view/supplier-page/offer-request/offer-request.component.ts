import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RequestQuote } from 'src/model/request-quote.model';
import { BreakPointService } from 'src/service/break-point.service';
import { DataService } from 'src/service/data.service';

import { businessType, BusinessType } from '../../../view/business-type.interface';
import { MessageInfoStatusComponent } from '../message-info-status/message-info-status.component';

interface RequestQuouteResponse {
  message: string;
  data: any;
}

@Component({
  selector: 'app-offer-request',
  templateUrl: './offer-request.component.html',
  styleUrls: ['./offer-request.component.scss'],
})
export class OfferRequestComponent implements OnInit, OnDestroy {
  @Input() dataFromDesktop: any;
  @ViewChild('picker') picker: MatDatepicker<Date>;
  public todayDate: Date = new Date();

  public askOfferForm: FormGroup;
  private offerMessageForm: string;
  private subscription: Subscription;
  public title = '';
  public messageFromResponse: boolean;
  public dataFromSupplier: any;
  public isMobile: boolean;
  public offerDate: string;
  public defaultEventType: string;
  eventTypeList!: { id: string; name: string }[];

  constructor(
    private readonly http: HttpClient,
    private readonly matBottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) private dataFromSupplierPage: any,
    private ds: DataService,
    private readonly breakPointService: BreakPointService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.eventTypeList = this.ds.eventTypeData;
    if (this.eventTypeList.length > 0) {
      this.defaultEventType = this.eventTypeList[0].id;
    }
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      params['date'] ? (this.offerDate = params['date']) : (this.offerDate = '');
    });

    this.breakPointService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this.dataFromSupplier = this.isMobile ? this.dataFromSupplierPage : this.dataFromDesktop;
    this.subscription = new Subscription();
    this.offerMessageForm =
      businessType[this.dataFromSupplier.data.businessServiceType as keyof BusinessType];

    this.askOfferForm = new FormGroup({
      message: new FormControl(this.offerMessageForm, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      date: new FormControl(
        this.dataFromSupplierPage.date ? this.dataFromSupplierPage.date : this.offerDate,
        Validators.required,
      ),
      guestsNumber: new FormControl('', Validators.required),
      agreedTerms: new FormControl(''),
      eventType: new FormControl(this.defaultEventType),
      location: new FormControl(''),
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openCalendar(): void {
    this.picker.open();
  }

  private validationBetweenFields(): any {
    const field1 = this.askOfferForm.value.phone?.value;
    const field2 = this.askOfferForm.value.phone?.value;

    if (!field1 && !field2) {
      return { atLeastOneFieldRequired: true };
    }

    return null;
  }

  private openMessageInfoModal(openMsgData: { sent: boolean; workCenterName?: string }): void {
    this.matBottomSheet.open(MessageInfoStatusComponent, { data: openMsgData });
  }

  public closeDialog(): void {
    this.matBottomSheet.dismiss();
  }

  onPhoneChanged(ev: any) {
    if (ev.target.value) this.askOfferForm.controls['phone'].setValue(ev.target.value);
  }

  public sendOffer(): any {
    if (this.askOfferForm.valid) {
      // Submit the form
      let formValues = this.askOfferForm.value;
      const quouteData: RequestQuote = {
        client: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone.toString(),
        },
        messages: formValues.message,
        eventDetails: {
          date: formValues.date,
          location: formValues.location,
          type: formValues.eventType,
          personNumber: formValues.guestsNumber,
        },
        // eslint-disable-next-line no-underscore-dangle
        workCenterID: this.dataFromSupplier.data._id,
        workCenterName: this.dataFromSupplier.data.about.title,
        userID: this.dataFromSupplier.data.userID,
      };
      this.http
        .post<RequestQuouteResponse>(`${environment.backendApi}supplier/request-quote`, quouteData)
        .subscribe((dataFromResponse: any) => {
          if (dataFromResponse.message === 'Succesful') {
            //TODO : handle  infoMessageModal depending on response data
            this.askOfferForm.reset();
            this.openMessageInfoModal({ sent: true, workCenterName: quouteData.workCenterName });
          } else {
            this.openMessageInfoModal({ sent: false });
          }
        });
    }
  }
}
