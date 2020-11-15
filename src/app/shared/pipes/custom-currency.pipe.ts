import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myCurrency' })
export class customCurrencyPipe implements PipeTransform {

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  PADDING = '000000';

  constructor() {
    this.DECIMAL_SEPARATOR = '.';
    this.THOUSANDS_SEPARATOR = ',';
  }

  transform(value: number, fractionSize: number = 2): string {
    let [ integer, fraction = '' ] = (value || '').toString()
      .split(this.DECIMAL_SEPARATOR);


    if (Number.isInteger(value)) {
      return value.toString();
    } else {
      fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
      : '';

      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

      return integer + fraction;
    }
  }

}
