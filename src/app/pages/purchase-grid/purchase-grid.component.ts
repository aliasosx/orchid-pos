import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-purchase-grid',
  templateUrl: './purchase-grid.component.html',
  styleUrls: ['./purchase-grid.component.css']
})
export class PurchaseGridComponent implements OnInit {

  constructor(private stockService: StockServicesService, private backendService: BackendServiceService) { }
  searchForm: FormGroup;
  productCategories: any;
  products: any;
  selectedCate: any;

  ngOnInit() {
    this.loadProductCategories();
    this.loadProducts();
  }
  async loadProductCategories() {
    this.stockService.getProductCategories().then(rsp => {
      rsp.subscribe(productCategories => this.productCategories = productCategories);
    });
  }
  async loadProducts() {
    this.backendService.getProducts().then(rsp => {
      rsp.subscribe(products => this.products = products);
    });
  }

}
