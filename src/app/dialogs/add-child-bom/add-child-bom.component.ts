import { Component, OnInit, Inject } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-add-child-bom',
  templateUrl: './add-child-bom.component.html',
  styleUrls: ['./add-child-bom.component.css']
})
export class AddChildBomComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, private be: BackendServiceService, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddChildBomComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  bomDetailForm: FormGroup;
  foods: any;
  products: any;
  bomDetails: any;
  units: any;
  showTableBom = false;

  ngOnInit() {
    this.bomDetailForm = new FormGroup({
      bomId: new FormControl(this.data),
      productId: new FormControl(),
      quantity: new FormControl(),
      unitId: new FormControl(),
      enabled: new FormControl(1),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
    this.loadFoods();
    this.loadBomDetailExisting();
    this.loadUnits();
    // console.log(this.bomDetails);
  }
  loadFoods() {
    this.be.getFoods().then(rsp => {
      rsp.subscribe(foods => {
        this.foods = foods;
      });
    });
    this.loadProducts();
    this.loadBomDetailExisting();
  }
  loadProducts() {
    this.bomService.getProductsForBom().then(rsp => {
      rsp.subscribe(products => {
        this.products = products;
      });
    });
  }
  async addChildBom() {
    if (this.bomDetailForm.valid) {
      const info = {
        bomId: this.data,
        productId: this.bomDetailForm.get('productId').value
      };
      let c = await this.bomService.duplicateItemAdd(info).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.bomService.createBomDetail(this.bomDetailForm.value).then(rsp => {
              rsp.subscribe(r => {
                if (r['status'] === 'success') {
                  this.loadBomDetailExisting();
                } else {
                  this.snackbar.open('Something when wrong!', 'OK', { duration: 1000 });
                }
              });
            });
          } else {
            this.snackbar.open('Duplicate record please select Other item', 'OK', { duration: 1000 });
            return;
          }
        });
      });
    } else {
      // console.log(this.bomDetailForm);
      this.snackbar.open('Form incomplete', 'OK', { duration: 1000 });
      return;
    }
  }
  async loadBomDetailExisting() {
    this.bomService.bomDetailByBomId(this.data).then(rsp => {
      rsp.subscribe(bomDetails => {
        this.bomDetails = bomDetails;
        if (this.bomDetails.length > 0) {
          this.showTableBom = true;
        } else {
          this.showTableBom = false;
        }
      });
    });
  }

  async loadUnits() {
    this.be.getUnit().then(rsp => {
      rsp.subscribe(r => {
        this.units = r;
      });
    });
  }
  closeDialog() {
    this.dialogRef.close('success');
  }
  removeItem(id) {
    this.bomService.deleteBomDetail(id).then(rsp => {
      rsp.subscribe(r => {
        if (r['status'] === 'success') {
          this.loadBomDetailExisting();
          return;
        } else {
          this.snackbar.open('Something when wrong!', 'OK', { duration: 1000 });
          return;
        }
      });
    });
  }
}
