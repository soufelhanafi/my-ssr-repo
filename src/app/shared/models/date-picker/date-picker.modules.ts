export interface DateModel {
  date: string;
  disabled: boolean;
  cssStyle: string;
}

export interface DatePickerModel {
  bookedDates: DateModel[];
  holidayDates: DateModel[];
}

export interface ParentComponentData {
  bookedDates: string[];
  holidayDates: string[];
  selectedDate: string | string[];
}
