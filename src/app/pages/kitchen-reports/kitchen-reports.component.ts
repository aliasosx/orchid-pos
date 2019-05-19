import { FormGroup, FormControl } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js';

@Component({
  selector: 'app-kitchen-reports',
  templateUrl: './kitchen-reports.component.html',
  styleUrls: ['./kitchen-reports.component.css']
})
export class KitchenReportsComponent implements OnInit {

  constructor(private backendService: BackendServiceService, private stockService: StockServicesService) { }

  kitchens: any;
  currentStocks: any;
  stockForm: FormGroup;
  currentStocksDetails: any;
  currentStocksDetailsByDate: any;


  stockNotlinkSummary: any;

  startDate = new Date();
  endDate = new Date();
  reportByStockFood = [];

  async ngOnInit() {
    this.stockForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });
    this.loadAllReports();
  }

  async loadAllReports() {
    await this.loadKitchens();
    await this.loadCurrentStock();
    // await this.loadReportByRange();
  }

  async loadKitchens() {
    this.backendService.getKitchens().then(rsp => {
      rsp.subscribe(kitchens => {
        this.kitchens = kitchens;
      });
    });
  }
  async loadCurrentStock() {
    this.stockService.getCurrentStocks().then(rsp => {
      rsp.subscribe(currentStocks => {
        // console.log(currentStocks);
        this.currentStocks = currentStocks['stocksSummary'];
        this.currentStocksDetails = currentStocks['stocksSummaryDetail'];
        this.stockNotlinkSummary = currentStocks['stockNotLinkSummary'];
      });
    });
  }
  async loadReportByRange() {
    if (this.stockForm.valid) {
      this.startDate = this.stockForm.get('startDate').value;
      this.endDate = this.stockForm.get('endDate').value;
      const dateRange = {
        startDate: this.stockForm.get('startDate').value,
        endDate: this.stockForm.get('endDate').value,
      };
      this.stockService.getCurrentStocksByDateRange(dateRange).then(rsp => {
        rsp.subscribe(currentStocksDetailsByDate => {
          // console.log(currentStocksDetailsByDate);
          this.currentStocksDetailsByDate = currentStocksDetailsByDate['stocksSummaryDetail'];
        });
      });
    }
  }
}
