import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const datePipe = new DatePipe('ro');
    const formattedDate = datePipe.transform(date, 'dd MMMM yyyy');
    console.log('pipe formated date', formattedDate);

    return formattedDate || '';
  }
}
