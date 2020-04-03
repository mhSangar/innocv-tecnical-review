import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

/**
 * Service to translate the date formats between the API requirements (ISO string)
 * and the front-end datepicker (NgbDateStruct interface).
 */
@Injectable({
  providedIn: "root"
})
export class DatepickerFormatService {

  constructor() {}

  /**
   * Formats an ISO string into a Datepicker object (NgbDateStruct)
   */
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

  /**
   * Formats Datepicker object (NgbDateStruct) into an ISO string 
   */
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
