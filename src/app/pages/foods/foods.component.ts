import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ViewExtendedFoodComponent } from './../../dialogs/view-extended-food/view-extended-food.component';
import { ViewFoodComponent } from './../../dialogs/view-food/view-food.component';
import { AddFoodComponent } from './../../dialogs/add-food/add-food.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddExtendedFoodComponent } from 'src/app/dialogs/add-extended-food/add-extended-food.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


declare var swal: any;

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router, private besrv: BackendServiceService) {
    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      return;
    } else {
      router.navigateByUrl('login');
    }
  }
  private user: Observable<firebase.User>;
  username_info: any;
  foodname: any;
  foods: any;
  foodList: any[] = [];
  commonFoods: any;
  parentsFoods: any;
  foodTypes: any;

  selectedCate: any;


  ngOnInit() {
    this.loadStartUp();
  }

  loadStartUp() {
    this.loadCommonFoods();
    this.loadParentsFoods();
    this.getFoodCat();
  }
  toggleEnaledFood(foods) {
    console.log(foods);
    let enabled;
    if (foods.enabled === 1) {
      enabled = 0;
    } else if (foods.enabled === 0) {
      enabled = 1;
    }
    const foodEnabled = {
      enabled
    };
    this.besrv.updateFood(foods.fid, foodEnabled).then(rsp => {
      rsp.subscribe(r => {
        if (r['status'] === 'success') {
          this.loadStartUp();
        }
      });
    });
  }
  toggleEnaledPFood(foods) {
    // console.log(foods.pFood.fid);
    let enabled;
    if (foods.pFood.enabled === 1) {
      enabled = 0;
    } else if (foods.pFood.enabled === 0) {
      enabled = 1;
    }
    const foodEnabled = {
      enabled
    };
    this.besrv.updateFood(foods.pFood.fid, foodEnabled).then(rsp => {
      rsp.subscribe(r => {
        if (r['status'] === 'success') {
          this.loadStartUp();
        }
      });
    });
  }
  loadCommonFoods() {
    this.besrv.getCommonFoodsList().then(foods => {
      foods.subscribe(commonFoods => {
        // console.log(commonFoods);
        this.commonFoods = commonFoods;
      });
    });
  }
  loadParentsFoods() {
    this.foodList = [];
    this.besrv.getFoodParentsList().then(foods => {
      foods.subscribe(fd => {
        this.parentsFoods = fd;
        this.parentsFoods.forEach(pFood => {
          this.besrv.getSubfoodById(pFood.fid).then(sFood => {
            sFood.subscribe(subFood => {
              this.foodList.push({
                pFood: pFood,
                sFood: subFood
              });
            });
          });
        });
      });
    });
  }
  openAddFood() {
    const dialogRef = this.dialog.open(AddFoodComponent, { width: '900px' });
    dialogRef.afterClosed().subscribe((rs) => {
      if (rs === 'success') {
        this.loadStartUp();
      } else {
        return;
      }
    });
  }
  async openViewFood(food) {
    const dialogRef = await this.dialog.open(ViewFoodComponent, { width: '900px', data: food });
    dialogRef.afterClosed().subscribe((rs) => {
      if (rs === 'success') {
        this.loadStartUp();
      } else {
        return;
      }
    });
  }
  async deleteFood(food) {
    swal({
      title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ?',
      text: 'ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        const jsonDeleteFood = {
          deleted: 1,
        };
        this.besrv.updateFood(food.fid, jsonDeleteFood).then(rsp => {
          rsp.subscribe(r => {
            if (r['status'] === 'success') {
              this.loadStartUp();
            }
          });
        });
      } else {
        return;
      }
    });
  }
  openAddExtendedFood(food) {
    const cnt = food.subFood.length;
    try {
      if (cnt === 0) {
        const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
      } else if (food.subFood == null) {
        const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
      } else {
        this.snackbarRef.open('Already have member, please use Other', 'Ok', { duration: 2000, verticalPosition: 'top' });
        return;
      }
    } catch (err) {
      const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
    }

  }
  async openViewExtendedFood(food) {
    const dialogRef = this.dialog.open(ViewExtendedFoodComponent, { width: '800px', data: food });
    let c = await dialogRef.afterClosed().subscribe(() => {
      // console.log('Loadded');
      this.loadStartUp();
    });
  }
  async getFoodCat() {
    this.besrv.getFoodTypes().then(t => {
      t.subscribe(foodTypes => {
        this.foodTypes = foodTypes;
      });
    });
  }
}

