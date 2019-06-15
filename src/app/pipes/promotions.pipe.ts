import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promotions'
})
export class PromotionsPipe implements PipeTransform {

  transform(promotions: any, promotionSearch: string): any {
    if (!promotionSearch) {
      return promotions;
    }
    return promotions.filter(p => p.promotion_name.indexOf(promotionSearch) !== -1);
  }

}
