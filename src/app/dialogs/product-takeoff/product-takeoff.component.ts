import { Component, OnInit } from '@angular/core';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { FormGroup } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-product-takeoff',
  templateUrl: './product-takeoff.component.html',
  styleUrls: ['./product-takeoff.component.css']
})
export class ProductTakeoffComponent implements OnInit {

  constructor(private stockServices: StockServicesService, private backendServices: BackendServiceService) { }

  productTakeOffForm: FormGroup;
  products: any;

  ngOnInit() {
    this.loadProducts();
  }
  async loadProducts() {
    this.backendServices.getProducts().then(rsp => {
      rsp.subscribe(products => {
        this.products = products;
      })
    });
  }

}
