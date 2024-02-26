import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';

import { BreakPointService } from 'src/service/break-point.service';
import { SearchService } from 'src/service/search.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false }) calendar: MatCalendar<any>;
  @Input() dataFromDesktop: any;

  public title: string;
  public today = new Date();
  public selectedDate: any;
  public dateToSend: Date;
  public bookedDates: string[];
  public isMobile: boolean;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public dataFromSupplierPage: any,
    private readonly matMottomSHeet: MatBottomSheet,
    private readonly dateAdapter: DateAdapter<any>,
    public readonly breakPointService: BreakPointService,
    private readonly searchService: SearchService,
  ) {}

  public ngOnInit(): void {
    this.isMobile = this.dataFromSupplierPage.isMobile;
    this.title = this.dataFromSupplierPage.title;
    //de verificat in BE ce se intampla cu acest bookedDates!!!

    // this.bookedDates = this.isMobile ? this.dataFromSupplierPage?.bookedDates : this.dataFromDesktop.bookedDates;
    this.bookedDates = this.isMobile
      ? this.dataFromSupplierPage?.bookedDates || []
      : this.dataFromDesktop.bookedDates || [];
  }

  public onSelectedDate(date: any): void {
    this.dateToSend = date;
  }

  public sendDate(): void {
    this.matMottomSHeet.dismiss();
    this.searchService.openAskOffer(this.dateToSend.toISOString());
  }

  public closeDialog(): void {
    this.matMottomSHeet.dismiss();
  }

  public previousMonth(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
  }

  public nextMonth(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
  }
  //Make custom dates disabled and set custom colors to them

  datefilter = (date: Date) => {
    // Set hours, minutes, seconds, and milliseconds of input date to zero
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    // Check if input date matches any booked date
    for (const bookedDate of this.bookedDates) {
      const bookedDateObj = new Date(bookedDate);
      // Set hours, minutes, seconds, and milliseconds of booked date to zero
      bookedDateObj.setHours(0, 0, 0, 0);
      if (inputDate.getTime() === bookedDateObj.getTime()) {
        return false; // disable the day if it's a booked date
      }
    }
    return true; // enable the day if it's not a booked date
  };

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const cssClasses: MatCalendarCellCssClasses = [];
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    for (const bookedDate of this.bookedDates) {
      const bookedDateObj = new Date(bookedDate);
      bookedDateObj.setHours(0, 0, 0, 0);

      if (inputDate.getTime() === bookedDateObj.getTime()) {
        cssClasses.push('booked-date');
        break;
      }
    }
    return cssClasses;
  };
}
