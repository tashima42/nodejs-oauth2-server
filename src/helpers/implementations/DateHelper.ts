import {IDateHelper} from "../IDateHelper";

export class DateHelper implements IDateHelper {
  nowPlusSeconds(seconds: number) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return new Date()
  }
}
