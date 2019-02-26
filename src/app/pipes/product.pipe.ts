import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(products: any[], searchProduct: any): any {
    if (!searchProduct) return products;
    return products.filter(p => p.productName.indexOf(searchProduct) != -1);
  }

}
