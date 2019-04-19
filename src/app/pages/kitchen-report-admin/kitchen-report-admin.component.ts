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
  grandTotal = 0;
  startDate: Date;
  foodList: any[] = [];

  dateFrom: FormGroup;

  ngOnInit() {
    this.dateFrom = new FormGroup({
      initDate: new FormControl(new Date()),
    });
    this.startDate = this.dateFrom.get('initDate').value;
    this.loadReport();
  }
  async loadReport() {
    this.be.reportsKitchenAdmin(this.startDate, '', 'Food').then(rsp => {
      this.foodList = [];
      let _total = 0;
      rsp.subscribe(r => {
        this.foodsTransactions = r;
        this.foodList.push(r);
        this.foodList.forEach(f => {
          f.forEach(element => {
            _total += parseInt(element.total_cost);
          });
        });
        console.log(_total);
        this.grandTotal = _total;
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
