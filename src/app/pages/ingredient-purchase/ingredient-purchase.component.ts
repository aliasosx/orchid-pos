import { IngredientPriceSelectComponent } from './../../dialogs/ingredient-price-select/ingredient-price-select.component';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddQuantityComponent } from 'src/app/dialogs/add-quantity/add-quantity.component';
import { FormGroup, FormControl } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-ingredient-purchase',
  templateUrl: './ingredient-purchase.component.html',
  styleUrls: ['./ingredient-purchase.component.css']
})
export class IngredientPurchaseComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomSercice: BomService, private backendService: BackendServiceService, private dialog: MatDialog, private snackbar: MatSnackBar) { }
  items: any;
  listItems: any;
  grandTotal = 0;
  cart = [];
  purchaseForm: FormGroup;
  ngOnInit() {
    this.purchaseForm = new FormGroup({
      refno: new FormControl(this.backendService.padding(Math.floor(Math.random() * 600000000000) + 1, 12)),
      changeHistoryId: new FormControl(2),
      ingredientId: new FormControl(),
      prevQuantity: new FormControl(),
      usedQuantity: new FormControl(0),
      currentQuantity: new FormControl(),
      src_price: new FormControl(),
      src_currCodeId: new FormControl(2),
      exchange_rate: new FormControl(1),
      convertedAmount: new FormControl(),
      remarks: new FormControl(),
      userId: new FormControl(this.backendService.getUserId()),
      unitId: new FormControl(),
    });

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
    item['refno'] = this.backendService.padding(Math.floor(Math.random() * 600000000000) + 1, 12);
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
        let cardTmp = JSON.parse(localStorage.getItem('ingredientCart'));
        let buffer = [];
        if (cardTmp.length === 1) {
          rsp[0].total = rsp[0].unitPrice * rsp[0].quantity;
          localStorage.setItem('ingredientCart', JSON.stringify(rsp));
          this.loadItemsToList();
        } else {
          cardTmp.forEach(element => {
            if (element.refno !== rsp[0].refno) {
              buffer.push(element);
            } else {
              rsp[0].total = rsp[0].unitPrice * rsp[0].quantity;
              buffer.push(rsp[0]);
            }
          });
          localStorage.setItem('ingredientCart', JSON.stringify(buffer));
          this.loadItemsToList();
        }
        this.loadItemsToList();
      }
    });
  }
  savePurchase() {
    swal({
      title: 'ທ່ານແນ່ໃຈບໍວ່າ ລາຍການຊື້ຖືກຕ້ອງ',
      text: 'ກະລຸນາ ກວດສອບຂໍ້ມູນໃຫ້ຖືກຕ້ອງ',
      icon: 'info',
      timer: 10000,
      buttons: true,
      dangerMode: true,
    }).then(r => {
      if (r) {
        const items = JSON.parse(localStorage.getItem('ingredientCart'));
        if (items.length > 0) {
          items.forEach(el => {
            console.log(el);
            this.purchaseForm.get('refno').setValue(el['refno']);
            this.purchaseForm.get('ingredientId').setValue(el['ingId']);
            this.purchaseForm.get('prevQuantity').setValue(el['currentQuantity']);
            this.purchaseForm.get('usedQuantity').setValue(el['quantity']);
            this.purchaseForm.get('currentQuantity').setValue(parseFloat(el['currentQuantity']) + parseFloat(el['quantity']));
            this.purchaseForm.get('src_price').setValue(el['srcUnitPrice']);
            this.purchaseForm.get('src_currCodeId').setValue(el['srcUnitCurrCodeId']);
            this.purchaseForm.get('exchange_rate').setValue(el['rate']);
            this.purchaseForm.get('convertedAmount').setValue(parseFloat(el['unitPrice']) * parseFloat(el['quantity']));
            this.purchaseForm.get('remarks').setValue('Order Ingredient');
            this.purchaseForm.get('unitId').setValue(el['unitId']);
            console.log(' Process ordering ');
            this.bomSercice.createIngredientChangeHistory(this.purchaseForm.value).then(rx => {
              rx.subscribe(rsp => {
                if (rsp['status'] === 'success') {
                  // this.snackbar.open('Purchase ' + el['ingredientName'] + ' Purchased');
                  localStorage.removeItem('ingredientCart');
                  this.loadItemsToList();
                  swal({
                    icon: 'success',
                    title: 'ການສັ່ງຊື້ ສຳເລັດ',
                    timer: 2000,
                  });
                }
              });
            });
          });
        }
      } else {
        return;
      }
    });
  }
}
