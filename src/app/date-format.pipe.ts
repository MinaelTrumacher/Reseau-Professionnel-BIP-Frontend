import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!moment(value).isValid()) {
      return '/';
    }

    return moment(value).locale('fr').format('LL');
  }

}