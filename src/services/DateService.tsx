import Moment from 'moment';

export default class DateService {
  public static getCurrentTimestamp(): number {
    const timestamp = Moment().valueOf();
    return timestamp;
  }
  public static formatTimestampToString(timestamp: number): string {
    const text = Moment(timestamp).format('DD-MM-YYYY');
    return text;
  }
  public static formatDateToStringDD_MM_YYYY(data: any): string {
    const timestamp = Moment(data).format('DD-MM-YYYY');
    return timestamp;
  }
  public static formatDateToTimestamp(data: any): number {
    const timestamp = Moment(data).valueOf();
    return timestamp;
  }
}
