import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../interfaces/food';

@Pipe({
  name: 'foodPipe'
})
export class FoodPipePipe implements PipeTransform {

  transform(value: any[], foodname: string): any {
    // console.log(value);
    if (!foodname) { return value; }
    return value.filter(food => food['food_name'].indexOf(foodname) != -1);
  }

}
