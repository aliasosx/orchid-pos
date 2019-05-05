import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productById'
})
export class ProductByIdPipe implements PipeTransform {

  transform(products: any, searchProductId: any): any {
    if (!searchProductId) { return products; }
    return products.filter(p => p.product_name.indexOf(searchProductId) !== -1);
  }

}
