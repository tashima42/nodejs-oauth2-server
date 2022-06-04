import {IDateHelper} from "../IDateHelper";

export class DateHelper implements IDateHelper {
  nowPlusSeconds(seconds: number): Date {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return new Date()
  }
  isDateLessThanNow(date: Date): boolean {
    return date < new Date();
  }
}
