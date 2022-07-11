import { IDateHelper } from "../IDateHelper";

export class DateHelper implements IDateHelper {
  nowPlusSeconds(seconds: number): Date {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return date
  }
  isDateLessThanNow(date: Date): boolean {
    return new Date() > date;
  }
}
