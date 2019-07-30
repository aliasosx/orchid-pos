import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberByPhone'
})
export class MemberByPhonePipe implements PipeTransform {

  transform(members: any[], phoneNo: string): any {
    if (!phoneNo) return members;
    return members.filter(m => m['mobile'].indexOf(phoneNo) !== -1);
  }

}
