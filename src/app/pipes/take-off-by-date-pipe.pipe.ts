import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'takeOffByDatePipe'
})
export class TakeOffByDatePipePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }
  transform(takeOfStocks: any, takeOfDate: any): any {

    if (!takeOfDate) {
      return takeOfStocks;
    }
    console.log(takeOfDate);
    return takeOfStocks.filter(p => this.datePipe.transform(p.takeOffDate, 'yyyy-MM-dd') === takeOfDate);
  }

}
