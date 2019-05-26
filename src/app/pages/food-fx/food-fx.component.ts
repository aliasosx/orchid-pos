import { Component, OnInit } from '@angular/core';
import { FoodFxServiceService } from 'src/app/services/food-fx-service.service';
import { MatDialog } from '@angular/material';
import { AddFoodFxComponent } from 'src/app/dialogs/add-food-fx/add-food-fx.component';
import { AddFoodFxTranxComponent } from 'src/app/dialogs/add-food-fx-tranx/add-food-fx-tranx.component';
declare var swal: any;

@Component({
  selector: 'app-food-fx',
  templateUrl: './food-fx.component.html',
  styleUrls: ['./food-fx.component.css']
})
export class FoodFxComponent implements OnInit {

  constructor(private _foodFxService: FoodFxServiceService, private dialog: MatDialog) { }
  foodFxs: any;

  ngOnInit() {
    this.loadFoodFx();
  }
  async loadFoodFx() {
    this._foodFxService.getFoodFx().then(rsp => {
      rsp.subscribe(foodFxs => {
        // console.log(foodFxs);
        this.foodFxs = foodFxs;
      });
    });
  }
  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddFoodFxComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(r => {
      this.loadFoodFx();
    });
  }
  addNewFoodFxTranx(foodFx) {
    const dialogRef = this.dialog.open(AddFoodFxTranxComponent, {
      width: '600px',
      data: foodFx
    });
    dialogRef.afterClosed().subscribe(r => {
      this.loadFoodFx();
    });
  }
  openEditFoodFx(foodFx) {
    const dialogRef = this.dialog.open(AddFoodFxComponent, {
      width: '600px',
      data: foodFx
    });
    dialogRef.afterClosed().subscribe(r => {
      this.loadFoodFx();
    });
  }

  toggleEabled(id, e) {
    let enabled;
    if (e === 1) {
      enabled = 0;
    } else if (e === 0) {
      enabled = 1;
    }
    const jsonEnable = {
      enabled: enabled
    };
    this._foodFxService.updateFoodFxById(id, jsonEnable).then(rsp => {
      rsp.subscribe(r => {
        if (r['status'] === 'success') {
          this.loadFoodFx();
        } else {
          return;
        }
      });
    });
  }

  removeItem(id) {
    if (id) {
      swal({
        title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ?',
        text: 'ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {
          this._foodFxService.deleteFoodFxById(id).then(rsp => {
            rsp.subscribe(r => {
              if (r['status'] === 'success') {
                this.loadFoodFx();
              }
            });
          });
        } else {
          return;
        }
      });
    }
  }
}
