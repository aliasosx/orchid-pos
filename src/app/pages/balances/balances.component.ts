import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PaymentServicesService } from 'src/app/services/payment-services.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {

  constructor(private dialog: MatDialog, private paymentServices: PaymentServicesService) { }
  dateForm: FormGroup;
  paymentMonthly: any;
  totalSrcAmount = 0;
  totalDesAmount = 0;

  ngOnInit() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
    this.loadReport();
  }
  async  loadReport() {
    await this.getPaymentMonthlyReport();
  }
  openAddPayment() {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '600px',
      maxHeight: '80vh',
    });
  }
  async getPaymentMonthlyReport() {
    this.totalSrcAmount = 0;
    this.totalDesAmount = 0;
    this.paymentServices.getPayments(this.dateForm.value).then(r => {
      r.subscribe(paymentMonthly => {
        this.paymentMonthly = paymentMonthly;
        this.paymentMonthly.forEach(element => {
          this.totalSrcAmount += parseInt(element['src_amount'], 10);
          this.totalDesAmount += parseInt(element['dest_amount'], 10);
        });
      });
    });
  }
}
