import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberPipe'
})
export class MemberPipePipe implements PipeTransform {

  transform(members: any[], memberCard: string): any {
    if (!memberCard) return members;
    return members.filter(m => m['cardNo'].indexOf(memberCard) !== -1);
  }

}
