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
      return ref.where('enabled', '==', true);
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


  ngOnInit() {
    const uuid1 = uuid.v1();
    const refno = Math.floor(Math.random() * 6000) + 1;
    this.orderForm = new FormGroup({
      orderId: new FormControl(uuid1),
      refno: new FormControl(refno),
      ticket: new FormControl(),
      food: new FormControl(),
      grandtotal: new FormControl(this.data.total),
      orderDateTime: new FormControl(new Date()),
      orderFinishTime: new FormControl(),
      settled: new FormControl(false),
      completed: new FormControl(false),
      username: new FormControl(this.username),
    });
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
        const paymenTypes = a.payload.doc.data();
        paymenTypes['id'] = a.payload.doc.id;
      })
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
        // clear cart
        console.log(this.cartRef)
        this.carts.subscribe(cart => {
          cart.forEach(doc => {
            console.log(doc);
          })
        });

      });
    } else {
      this.paymentBtnDisabled = false;
      return;
    }
  }
}
