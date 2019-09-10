import { IngredientPriceSelectComponent } from './../../dialogs/ingredient-price-select/ingredient-price-select.component';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialog } from '@angular/material';
import { AddQuantityComponent } from 'src/app/dialogs/add-quantity/add-quantity.component';
declare var swal: any;

@Component({
  selector: 'app-ingredient-purchase',
  templateUrl: './ingredient-purchase.component.html',
  styleUrls: ['./ingredient-purchase.component.css']
})
export class IngredientPurchaseComponent implements OnInit {

  constructor(private bomSercice: BomService, private backendService: BackendServiceService, private dialog: MatDialog) { }
  items: any;
  listItems: any;
  grandTotal = 0;
  cart = [];
  ngOnInit() {
    this.loadItems();
    this.loadItemsToList();
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
    let buffer = [];
    this.cart = [];
    // console.log(buffer);
    item['refno'] = this.backendService.padding(Math.floor(Math.random() * 60000000000) + 1, 12);
    item['quantity'] = 1;
    item['total'] = item['quantity'] * item['unitPrice'];
    this.cart.push(item);
    if (!localStorage.getItem('ingredientCart')) {
      localStorage.setItem('ingredientCart', JSON.stringify(this.cart));
      this.loadItemsToList();
    } else {
      buffer = [];
      buffer = JSON.parse(localStorage.getItem('ingredientCart'));
      let dup = false;
      for (let i = 0; i < buffer.length; i++) {
        if (item['ingId'] === buffer[i].ingId) {
          swal({
            title: 'ບໍ່ສາມາດເພິ່ມລາຍການຊໍ້າໄດ້',
            text: 'ກະລຸນາ ປ່ຽນແປງຈຳນວນແທນການກົດຊໍ້າ',
            icon: 'error',
            timer: 5000,
          });
          dup = true;
          break;
        }
      }
      if (dup === false) {
        buffer.push(item);
        localStorage.setItem('ingredientCart', JSON.stringify(buffer));
        this.loadItemsToList();
      }
    }
  }
  loadItemsToList() {
    this.listItems = JSON.parse(localStorage.getItem('ingredientCart'));
    this.grandTotal = 0;
    if (this.listItems) {
      this.listItems.forEach(element => {
        this.grandTotal += element['total'];
      });
    }
    // console.log(this.listItems);
  }
  openQuantity(item) {
    const dialogRef = this.dialog.open(AddQuantityComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(q => {
      if (q) {
        let buffer = [];
        const postBuffer = [];
        buffer = JSON.parse(localStorage.getItem('ingredientCart'));
        buffer.forEach(element => {
          if (element['refno'] === item['refno']) {
            element['quantity'] = q;
            element['total'] = element['unitPrice'] * q;
            postBuffer.push(element);
          } else {
            postBuffer.push(element);
          }
        });
        localStorage.setItem('ingredientCart', JSON.stringify(postBuffer));
        this.loadItemsToList();
        return;
      } else {
        return;
      }
    });
  }
  removeItem(item) {
    let buffer = [];
    const postBuffer = [];
    buffer = JSON.parse(localStorage.getItem('ingredientCart'));
    buffer.forEach(element => {
      if (element['refno'] !== item['refno']) {
        postBuffer.push(element);
      }
    });
    if (postBuffer.length > 0) {
      localStorage.setItem('ingredientCart', JSON.stringify(postBuffer));
      this.loadItemsToList();
    } else {
      localStorage.removeItem('ingredientCart');
      this.loadItemsToList();
    }
    return;
  }
  openIngredientPriceSelect(item) {
    const dialogRef = this.dialog.open(IngredientPriceSelectComponent, {
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp) {
        console.log(rsp);
      }
    });
  }
}
