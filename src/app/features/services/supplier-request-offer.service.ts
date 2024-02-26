import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APP_SETTINGS } from '@core/constants';

@Injectable()
export class SupplierRequestOfferService {
  constructor(private fb: FormBuilder) {}

  buildRequestOfferForm(): FormGroup {
    return this.fb.group({
      fullName: [APP_SETTINGS.EMPTY_LINE, Validators.required],
      emailAddress: [APP_SETTINGS.EMPTY_LINE, [Validators.required, Validators.email]],
      phoneNumber: [APP_SETTINGS.EMPTY_LINE, Validators.required],
      eventType: [APP_SETTINGS.EMPTY_LINE, Validators.required],
      eventDate: [APP_SETTINGS.EMPTY_LINE, Validators.required],
      numberOfAttendees: [APP_SETTINGS.EMPTY_LINE],
      message: [APP_SETTINGS.EMPTY_LINE, Validators.required],
      supplierAgreement: [false, Validators.required],
      marityAgreement: [false, Validators.required],
    });
  }
}
