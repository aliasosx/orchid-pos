import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-stock-review',
  templateUrl: './stock-review.component.html',
  styleUrls: ['./stock-review.component.css']
})
export class StockReviewComponent implements OnInit {

  constructor(private backendService: BackendServiceService) { }
  stockForm: FormGroup;
  reports: any;
  products: any;
  transactions: any;

  ngOnInit() {
    this.stockForm = new FormGroup({
      productId: new FormControl(),
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });
    this.loadProducts();
  }
  loadReportByRange() {
    this.backendService.getStockReportByProdId(this.stockForm.value).then(r => {
      r.subscribe(items => this.reports = items);
    });
  }
  loadProducts() {
    this.backendService.getProducts().then(r => {
      r.subscribe(products => this.products = products);
    });
  }
  getTransactionsByOrderId(orderId) {
    this.backendService.getOrderDetailByOrderId(orderId).then(r => {
      r.subscribe(transactions => this.transactions = transactions);
    });
  }
}
