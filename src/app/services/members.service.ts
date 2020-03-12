import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private _http: HttpClient) { }
  backendUrlMember = environment.backendMemberUrl.url;

  async getMemberById(id) {
    return this._http.get(this.backendUrlMember + 'memberById/' + id);
  }
  async getMemberByPhone(phone) {
    return this._http.get(this.backendUrlMember + 'memberByPhone/' + phone);
  }
  async getMemberByCardNo(cardNo) {
    try {
      return this._http.get(this.backendUrlMember + 'memberByCard/' + cardNo);
    } catch (err) {
      return;
    }
  }
  async getMembers() {
    return this._http.get(this.backendUrlMember + 'members');
  }
  async getCurrentPoint(memberId, totalPrice) {
    return this._http.get(this.backendUrlMember + 'pointByMemberId/' + memberId + '/' + totalPrice);
  }
  async checkRewardByPoint(totalPrice) {
    return this._http.get(this.backendUrlMember + 'checkRewardByPoint/' + totalPrice);
  }
  async getRewardById(id) {
    return this._http.get(this.backendUrlMember + 'rewardsById/' + id);
  }
  async getRewardFoodByFoodTypeId(id, price) {
    return this._http.get(this.backendUrlMember + 'foodRewardByFoodTypeId/' + id + '/' + price);
  }

}
