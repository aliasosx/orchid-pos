import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PaymentServicesService } from 'src/app/services/payment-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private paymentServices: PaymentServicesService, private backendService: BackendServiceService, private dialogRef: MatDialogRef<AddPaymentComponent>) { }

  expenditureForm: FormGroup;
  paymentTypes: any;
  currencies: any;

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
    this.getPaymentTypes();
    this.getCurrencies();
  }

  async getPaymentTypes() {
    this.paymentServices.getPaymentTypes().then(r => {
      r.subscribe(paymentTypes => this.paymentTypes = paymentTypes);
    });
  }
  async getCurrencies() {
    this.backendService.getCurrencies().then(r => {
      r.subscribe(currencies => this.currencies = currencies);
    });
  }
  async exchangeRateCalulate() {
    if (parseInt(this.expenditureForm.get('exchangeRate').value, 10) > 0) {
      // tslint:disable-next-line: max-line-length
      this.expenditureForm.get('dest_amount').setValue(parseInt(this.expenditureForm.get('exchangeRate').value, 10) * parseInt(this.expenditureForm.get('src_amount').value, 10))
    }
  }
  async createPayment() {
    if (this.expenditureForm.valid) {
      this.paymentServices.CreatePayment(this.expenditureForm.value).then(r => {
        r.subscribe(payment => {
          if (payment['id']) {
            this.dialogRef.close('success');
          } else {
            return;
          }
        });
      });
    }
  }

}
