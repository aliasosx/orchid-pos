import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  constructor() { }

  expenditureForm: FormGroup;

  ngOnInit() {
    this.expenditureForm = new FormGroup({
      paymentTypeId: new FormControl(),
      src_amount: new FormControl(0),
      currencyId: new FormControl(),
      exchangeRate: new FormControl(0),
      dest_amount: new FormControl(0),
      description: new FormControl(),
      paymentDate: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
  }

}
