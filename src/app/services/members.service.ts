import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this._http.get(this.backendUrlMember + 'memberByCard/' + cardNo);
  }
  async getMembers() {
    return this._http.get(this.backendUrlMember + 'members');
  }
}
