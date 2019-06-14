import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  dateForm: FormGroup;
  ngOnInit() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }
  async  loadReport() {

  }
  openAddPayment() {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '600px',
    });
  }
}
