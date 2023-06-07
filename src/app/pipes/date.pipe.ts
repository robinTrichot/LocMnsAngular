import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const datePipe = new DatePipe();
    return datePipe.transform(value, 'yyyy-MM-dd');
  }
}
