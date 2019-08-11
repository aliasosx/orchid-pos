import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productByBarcode'
})
export class ProductByBarcodePipe implements PipeTransform {

  transform(products: any, code: any): any {
    if (!code) { return products; }
    return products.filter(p => p.barcode.indexOf(code) !== -1);
  }

}
