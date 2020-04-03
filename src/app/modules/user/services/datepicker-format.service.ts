import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root"
})
export class DatepickerFormatService {

  constructor() {}

  stringToDatepicker(inputDate: string): NgbDateStruct {
    if (!inputDate) return null;

    const tmpDate = new Date(inputDate);
    const outputDate = {
      year: tmpDate.getFullYear(),
      month: tmpDate.getMonth() + 1,
      day: tmpDate.getUTCDate()
    };

    return outputDate;
  }

  datepickerToString(inputDate: NgbDateStruct): string {
    if (!inputDate) return null;

    const tmpDate = new Date(
      inputDate.year,
      inputDate.month - 1,
      inputDate.day
    );

    return tmpDate.toISOString();
  }
}
