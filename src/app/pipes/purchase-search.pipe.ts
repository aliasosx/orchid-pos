import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purchaseSearch'
})
export class PurchaseSearchPipe implements PipeTransform {

  transform(products: any[], productName: string): any {
    if (!productName) { return products; }
    return products.filter(product => product['product_name'].indexOf(productName) !== -1);
  }

}
