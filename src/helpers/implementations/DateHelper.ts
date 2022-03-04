import {IDateHelper} from "../IDateHelper";

export class DateHelper implements IDateHelper {
  nowPlusSeconds(seconds: number) {
    return new Date()
  }
}
