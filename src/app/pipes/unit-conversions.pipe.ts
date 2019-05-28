import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConversions'
})
export class UnitConversionsPipe implements PipeTransform {

  transform(quantity, quantityPerPack): any {
    // tslint:disable-next-line: max-line-length
    return Math.floor(parseInt(quantity, 10) / parseInt(quantityPerPack, 10)) + ' ແກັດ , ' + Math.floor(parseInt(quantity, 10) % parseInt(quantityPerPack, 10)) + ' ໜ່ວຍ = ' + parseInt(quantity, 10) + ' ໜ່ວຍ';
  }

}
