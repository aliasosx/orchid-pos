import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCatPipe'
})
export class ProductCatPipePipe implements PipeTransform {

  transform(value: any[], productcategoryId: string): any {
    // console.log(value);
    if (!productcategoryId || parseInt(productcategoryId, 10) === 0) { return value; }
    return value.filter(procat => parseInt(procat['productCategoryId'], 10) === parseInt(productcategoryId, 10));
  }

}
