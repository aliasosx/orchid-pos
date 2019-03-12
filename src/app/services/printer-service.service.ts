import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrinterServiceService {
  constructor(private http: HttpClient) { }
  printUrl = 'http://localhost:8000/';
  print_local(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.printUrl + 'print', data).subscribe(res => {
        resolve(res);
      });
    });
  }
}
