import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';

import { APP_SETTINGS } from '@core/constants';
import { DateModel, DatePickerModel, ParentComponentData } from '@shared/models';
import { BreakPointService } from 'src/service/break-point.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements OnInit {
  selectedDateName: string;
  selectedDateMonthYear: string | null;
  @ViewChild('calendar', { static: false }) calendar: MatCalendar<any>;
  @Input() parentData: ParentComponentData;
  @Input() isMobile: boolean | null;
  @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();

  today = new Date(Date.now());
  selectedDate: Date;
  startDate: Date;
  dates: DatePickerModel = { bookedDates: [], holidayDates: [] };

  constructor(
    private readonly dateAdapter: DateAdapter<any>,
    readonly breakPointService: BreakPointService,
  ) {}

  public ngOnInit(): void {
    this.setBookedDates();
    this.setHolidayDates();
    this.setInitalDateAndSelectedDate();
  }

  isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  onSelectedDate(date: any): void {
    this.selectedDate = date;
    this.dateSelected.emit(this.selectedDate.toISOString());
    this.viewSelectedDate(this.selectedDate.toISOString());
  }

  viewSelectedDate(selectedDate: string): void {
    const days = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
    const date = new Date(selectedDate.substring(0, 10));
    date.setDate(date.getDate() + 1);

    this.selectedDateName = days[date.getDay()];
    this.selectedDateMonthYear =
      this.addLeadingZero(date.getDate()) +
      '.' +
      this.addLeadingZero(date.getMonth()) +
      '.' +
      this.addLeadingZero(date.getFullYear());
  }

  private addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  sendDate(): void {
    this.dateSelected.emit(this.selectedDate.toISOString());
  }

  previousMonth(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
  }

  nextMonth(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
  }

  datefilter = (date: Date) => {
    const inputDate = new Date(date).toLocaleDateString(APP_SETTINGS.RO_LOCALE_FORMAT);

    let disabled: boolean = true;

    Object.keys(this.dates).forEach((dateType) => {
      const invalidDateArray = this.dates[dateType as keyof DatePickerModel];
      invalidDateArray.forEach((invalidDate: DateModel) => {
        if (
          inputDate === new Date(invalidDate.date).toLocaleDateString(APP_SETTINGS.RO_LOCALE_FORMAT)
        ) {
          disabled = !invalidDate.disabled;
        }
      });
    });

    return disabled;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (date: Date) => {
    const inputDate = new Date(date).toLocaleDateString(APP_SETTINGS.RO_LOCALE_FORMAT);

    let cssStyle: string = APP_SETTINGS.EMPTY_LINE;

    Object.keys(this.dates).forEach((dateType) => {
      const invalidDateArray = this.dates[dateType as keyof DatePickerModel];
      invalidDateArray.forEach((invalidDate: DateModel) => {
        if (
          inputDate === new Date(invalidDate.date).toLocaleDateString(APP_SETTINGS.RO_LOCALE_FORMAT)
        ) {
          cssStyle = invalidDate.cssStyle;
        }
      });
    });

    return cssStyle;
  };

  private setBookedDates(): void {
    (this.parentData.bookedDates || []).map((bookedDate) => {
      this.dates.bookedDates.push({
        date: bookedDate,
        disabled: true,
        cssStyle: 'booked-day',
      });
    });
  }

  private setHolidayDates(): void {
    (this.parentData.holidayDates || []).map((holidayDate) => {
      this.dates.holidayDates.push({
        date: holidayDate,
        disabled: true,
        cssStyle: 'holiday',
      });
    });
  }

  private setInitalDateAndSelectedDate(): void {
    const initialDate = this.parentData.selectedDate;

    if (typeof initialDate === 'string' && this.isValidDate(initialDate)) {
      this.selectedDate = new Date(initialDate);
      this.dateSelected.emit(this.selectedDate.toISOString());

      const initialMonthDate = this.selectedDate.getMonth();
      const initialYearDate = this.selectedDate.getFullYear();

      this.startDate = new Date(initialYearDate, initialMonthDate);
    } else if (Array.isArray(initialDate) && initialDate.length > 0) {
      const firstDate = initialDate[0];
      if (this.isValidDate(firstDate)) {
        this.selectedDate = new Date(firstDate);
        this.dateSelected.emit(this.selectedDate.toISOString());

        const initialMonthDates = this.selectedDate.getMonth();
        const initialYearDates = this.selectedDate.getFullYear();

        this.startDate = new Date(initialYearDates, initialMonthDates);
      }
    } else {
      this.selectedDate = new Date(Date.now());
      this.dateSelected.emit(this.selectedDate.toISOString());
      this.startDate = new Date(Date.now());
    }
  }
}
