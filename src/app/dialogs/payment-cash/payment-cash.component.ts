import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cart } from 'src/app/interfaces/cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Ticket } from 'src/app/interfaces/ticket';

import * as uuid from 'uuid';
import { PaymentType } from 'src/app/interfaces/paymentType';

@Component({
  selector: 'app-payment-cash',
  templateUrl: './payment-cash.component.html',
  styleUrls: ['./payment-cash.component.css']
})
export class PaymentCashComponent implements OnInit {
  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<PaymentCashComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.cartRef = db.collection<Cart>('carts', ref => {
      return ref.where('username', '==', this.username);
    });
    this.ticketsRef = db.collection<Ticket>('tickets', ref => {
      return ref.where('used', '==', false).orderBy('ticket', 'asc');
    });
    this.paymentTypesRef = db.collection<PaymentType>('paymentTypes', ref => {
      return ref.where('enabled', '==', true).orderBy('paymentCode', 'asc');
    });
  }
  username: string = 'administrator';
  cartRef: AngularFirestoreCollection<Cart>;
  carts: Observable<any[]>;

  paymentBtnDisabled = false;

  orderForm: FormGroup;
  ticketsRef: AngularFirestoreCollection<Ticket>;
  tickets: Observable<any[]>;
  foodList: any = [];

  paymentTypesRef: AngularFirestoreCollection<PaymentType>;
  paymentTypes: Observable<any[]>;
  showPaymentCash = 'hidden';
  cartId: string;

  ngOnInit() {
    const uuid1 = uuid.v1();
    const refno = this.padding(Math.floor(Math.random() * 6000) + 1, 12);
    this.orderForm = new FormGroup({
      orderId: new FormControl(uuid1),
      refno: new FormControl(refno),
      ticket: new FormControl(),
      food: new FormControl(),
      grandtotal: new FormControl(this.data.total),
      recieved: new FormControl(this.data.total),
      change: new FormControl(0),
      paymentType: new FormControl(),
      orderDateTime: new FormControl(new Date()),
      orderFinishTime: new FormControl(),
      settled: new FormControl(false),
      completed: new FormControl(false),
      username: new FormControl(this.username),
    });

    this.orderForm.get('paymentType').setValue('CASH');
    this.carts = this.cartRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const cart = a.payload.doc.data();
        cart['id'] = a.payload.doc.id;
        return cart;
      });
    }));

    this.carts.subscribe(doc => {
      doc.forEach(element => {
        element['done'] = false;
        this.foodList.push(element);
      })
    });

    this.paymentTypes = this.paymentTypesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.orderForm.get('food').setValue(this.foodList);

    this.tickets = this.ticketsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const tickets = a.payload.doc.data();
        tickets['id'] = a.payload.doc.id;
        return tickets;
      });
    }));
  }
  paymentProcess() {
    this.paymentBtnDisabled = true;
    if (this.orderForm.valid) {
      this.db.collection('orders').add(this.orderForm.value).then((res) => {
        //Update Ticket
        //this.ticketsRef.doc(this.getTicketById(this.orderForm.get('ticket').value).id).update()
      });
    } else {
      this.paymentBtnDisabled = false;
      return;
    }
  }
  checkPaymentCash(payment) {
    console.log(payment);
    if (payment == 'CASH') {
      this.showPaymentCash = '';
    } else {
      this.showPaymentCash = 'hidden';
    }
  }
  changeCalculation() {
    this.orderForm.get('change').setValue(this.orderForm.get('recieved').value - this.data.total);
  }
  padding(num: number, size: number) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  getTicketById(ticket) {
    const doc = this.db.collection<Ticket>('tickets', ref => {
      return ref.where('ticket', '==', ticket);
    }).snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    doc.subscribe(_ticket => {
      _ticket.forEach(t => {
        console.log(t);
      });
    });
  }
}
