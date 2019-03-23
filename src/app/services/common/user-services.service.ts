import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private _http: HttpClient) { }
  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async getUsers() {
    return this._http.get(this.backendService + 'users', this.httpOptions);
  }
  async createUser(user) {
    return this._http.post(this.backendService + 'register', user);
  }
  async updateUser(user) {
    return this._http.put(this.backendService + 'users/' + user.id, user, this.httpOptions);
  }

}
