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

  deriverGrandTotal = 0;
  deriverCountItem = 0;


  startDate: Date;
  endDate: Date;
  foodList: any[] = [];

  netPayment = 0;
  paymentSummaries: any;
  totalPaymentSumm = 0;
  dateFrom: FormGroup;
  payment_by_kitchen_derivery: any;
  payment_by_kitchen_deriveries: any[] = [];

  ngOnInit() {
    this.dateFrom = new FormGroup({
      initDate: new FormControl(new Date()),
      endDate: new FormControl(new Date())
    });
    this.startDate = this.dateFrom.get('initDate').value;
    this.loadReport();
  }
  async loadReport() {
    this.startDate = this.dateFrom.get('initDate').value;
    this.endDate = this.dateFrom.get('endDate').value;

    this.deriverCountItem = 0;
    this.deriverGrandTotal = 0;

    // console.log('OK');
    this.paymentCount = 0;
    this.paymentSummary = 0;

    this.be.reportsKitchenAdmin(this.dateFrom.get('initDate').value, this.dateFrom.get('endDate').value, 'Food').then(rsp => {
      this.foodList = [];
      this.payment_by_kitchen_deriveries = [];
      let _total = 0;
      let _count = 0;

      this.netPayment = 0;

      let _paymentTotal = 0;
      let _paymentCount = 0;


      let _total_deriveries = 0;
      let _count_deriveries = 0;

      rsp.subscribe(r => {
        this.foodsTransactions = r['reports'];
        this.payments = r['report_payment_by_kitchen'];
        this.payment_by_kitchen_derivery = r['payment_by_kitchen_derivery'];
        this.paymentList = [];
        this.foodList.push(r['reports']);
        this.payment_by_kitchen_deriveries.push(r['payment_by_kitchen_derivery']);
        this.foodList.forEach(f => {
          f.forEach(element => {
            _total += parseInt(element.total_cost, 10);
            _count += parseInt(element.quantity, 10);
          });
        });
        _total_deriveries = 0;
        _count_deriveries = 0;
        this.payment_by_kitchen_deriveries.forEach(el => {
          el.forEach(e => {
            _total_deriveries += parseInt(e.total_cost, 10);
            _count_deriveries += parseInt(e.quantity, 10);
          });
        });
        this.paymentList.push(r['report_payment_by_kitchen']);
        this.paymentList.forEach(p => {
          p.forEach(element => {
            _paymentTotal += parseInt(element.amount, 10);
            _paymentCount += parseInt(element.quantity, 10);
          });
        });

        this.paymentSummaries = r['summary_payment'];
        this.totalPaymentSumm = 0;
        r['summary_payment'].forEach(paymentSumm => {
          this.totalPaymentSumm += paymentSumm['Amount'];
        });

        this.grandTotal = _total;
        this.countItem = _count;

        this.deriverGrandTotal = _total_deriveries;
        this.deriverCountItem = _count_deriveries;


        this.paymentCount = _paymentCount;
        this.paymentSummary = _paymentTotal;

        if (this.paymentSummary) {
          this.netPayment = this.grandTotal - this.paymentSummary;
        } else {
          this.netPayment = this.grandTotal;
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
