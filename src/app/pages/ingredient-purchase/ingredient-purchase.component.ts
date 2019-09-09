import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';

@Component({
  selector: 'app-ingredient-purchase',
  templateUrl: './ingredient-purchase.component.html',
  styleUrls: ['./ingredient-purchase.component.css']
})
export class IngredientPurchaseComponent implements OnInit {

  constructor(private bomSercice: BomService, private backendService: BackendServiceService) { }
  items: any;

  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.bomSercice.getIngredientPurchasegrid().then(r => {
      r.subscribe(items => {
        this.items = items;
      });
    });
  }
  addItemToCart(item) {
    // console.log(item);
    
  }
}
