import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServicesService {

  constructor(private http: HttpClient) { }
  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };
  async getPaymentTypes() {
    return this.http.get(this.backendService + 'paymentTypes', this.httpOptions);
  }
  async CreatePayment(data) {
    return this.http.post(this.backendService + 'payment', data, this.httpOptions);
  }
  async getPayments(data) {
    return this.http.post(this.backendService + 'paymentByDate', data, this.httpOptions);
  }
}
