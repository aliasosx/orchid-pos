import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kitchen-report-admin',
  templateUrl: './kitchen-report-admin.component.html',
  styleUrls: ['./kitchen-report-admin.component.css']
})
export class KitchenReportAdminComponent implements OnInit {

  constructor(private be: BackendServiceService) {
  }
  viewReport = 'hidden';

  initDate: Date;
  foodsTransactions: any;
  payments: any;
  paymentCount = 0;
  paymentSummary = 0;
  paymentList: any[] = [];

  grandTotal = 0;
  countItem = 0;
  startDate: Date;
  foodList: any[] = [];

  netPayment = 0;

  dateFrom: FormGroup;

  ngOnInit() {
    this.dateFrom = new FormGroup({
      initDate: new FormControl(new Date()),
    });
    this.startDate = this.dateFrom.get('initDate').value;
    this.loadReport();
  }
  async loadReport() {
    this.startDate = this.dateFrom.get('initDate').value;
    console.log('OK');
    this.paymentCount = 0;
    this.paymentSummary = 0;
    this.be.reportsKitchenAdmin(this.dateFrom.get('initDate').value, '', 'Food').then(rsp => {
      this.foodList = [];
      let _total = 0;
      let _count = 0;

      this.netPayment = 0;

      let _paymentTotal = 0;
      let _paymentCount = 0;

      rsp.subscribe(r => {
        this.foodsTransactions = r['reports'];
        this.payments = r['report_payment_by_kitchen'];
        this.paymentList = [];
        this.foodList.push(r['reports']);
        this.foodList.forEach(f => {
          f.forEach(element => {
            _total += parseInt(element.total_cost, 10);
            _count += parseInt(element.quantity, 10);
          });
        });

        this.paymentList.push(r['report_payment_by_kitchen']);
        this.paymentList.forEach(p => {
          p.forEach(element => {
            _paymentTotal += parseInt(element.amount, 10);
            _paymentCount += parseInt(element.quantity, 10);
          });
        });

        this.grandTotal = _total;
        this.countItem = _count;

        this.paymentCount = _paymentCount;
        this.paymentSummary = _paymentTotal;

        if (this.paymentSummary) {
          this.netPayment = this.grandTotal - this.paymentSummary;
        }

        if (_total > 0) {
          this.viewReport = '';
        } else {
          this.viewReport = 'hidden';
        }
      });
    });
  }
  async dateEvent(e) {
    if (e) {
      this.initDate = new Date(e.target.value);
      this.startDate = this.initDate;
      let c = await this.loadReport();
    }
  }
}
