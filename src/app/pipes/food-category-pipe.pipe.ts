import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodCategoryPipe'
})
export class FoodCategoryPipePipe implements PipeTransform {

  transform(value: any[], foodcategoryId: string): any {
    // console.log(value);
    if (!foodcategoryId || parseInt(foodcategoryId, 10) === 0) { return value; }
    return value.filter(foodcat => parseInt(foodcat['foodTypeId'], 10) === parseInt(foodcategoryId, 10));
  }
}
