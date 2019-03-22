import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }
  backendService = environment.backendUrl.url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async login(username, password) {
    const auth = {
      username: username,
      password: password
    };
    //  console.log(auth);
    return await this._http.post(this.backendService + 'auth', auth);
  }
  async getUserById(id) {
    return this._http.get(this.backendService + 'users/' + id, this.httpOptions);
  }
  async getMenuByUsrId() {
    const usrId = await JSON.parse(localStorage.getItem('usrObj')).id;
    return this._http.get(this.backendService + 'menus/' + usrId, this.httpOptions);
  }
}
