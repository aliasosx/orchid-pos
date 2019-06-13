import { DatePipe } from '@angular/common';
import { Order } from './../../interfaces/order';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<ListTransactionsComponent>, @Inject(MAT_DIALOG_DATA) public data, private backendService: BackendServiceService, private db: AngularFirestore, private datePipe: DatePipe) {
    this.ordersRef = db.collection<Order>('orders', ref => ref.where('paymentType', '==', data));
  }
  ordersRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;
  foods: any;
  grandTotal = this.data.grandTotal;

  ngOnInit() {
    const dataParams = {
      paymentId: this.data.paymentId,
      orderDate: new Date(),
    };
    this.backendService.getOrderDetailReport(dataParams).then(r => {
      r.subscribe(foods => {
        this.foods = foods;
      });
    });
  }
}
