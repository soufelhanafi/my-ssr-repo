import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SupplierDatesModel } from '@features/models/supplier/supplier-calendar.model';

@Component({
  selector: 'app-supplier-calendar',
  templateUrl: './supplier-calendar.component.html',
  styleUrls: ['./supplier-calendar.component.scss'],
})
export class SupplierCalendarComponent implements OnInit {
  @Input() dateObject: SupplierDatesModel;
  @Input() displayCalendar: boolean;
  @Input() isMobile: boolean | null = false;
  @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() askForOffer: EventEmitter<void> = new EventEmitter<void>();

  selectedDate: string;
  supplierDatesObject: SupplierDatesModel;
  holidayDates: string[] = [];
  calendarDisplay: boolean;

  ngOnInit(): void {
    this.supplierDatesObject = {
      bookedDates: this.dateObject.bookedDates,
      holidayDates: this.dateObject.holidayDates,
      selectedDate: this.dateObject.selectedDate,
    };

    this.calendarDisplay = this.displayCalendar;
  }

  onDateSelected(date: string): void {
    this.selectedDate = date;
  }

  askForOfferClick(): void {
    this.askForOffer.emit();
  }
}
