export interface IDateHelper {
  nowPlusSeconds(seconds: number): Date,
  isDateLessThanNow(date: Date): boolean,
}
