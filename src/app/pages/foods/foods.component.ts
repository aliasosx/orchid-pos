import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ViewExtendedFoodComponent } from './../../dialogs/view-extended-food/view-extended-food.component';
import { ViewFoodComponent } from './../../dialogs/view-food/view-food.component';
import { AddFoodComponent } from './../../dialogs/add-food/add-food.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
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

  ngOnInit() {
    this.loadStartUp();
  }

  loadStartUp() {
    this.besrv.getFoodDisplay().then((foods) => {
      this.foods = foods;

      this.foods.subscribe(async (fds) => {
        fds.forEach(async (element) => {
          await console.log('Food ' + element.food_name + ' with ');

          await this.besrv.getSubfoodById(element.id).then((sf) => {
            sf.subscribe(fs => {

            });
          });
        });
      });

    });

  }
  openAddFood() {
    const dialogRef = this.dialog.open(AddFoodComponent, { width: '900px' });
    dialogRef.afterClosed().subscribe(() => {
      this.loadStartUp();
    });
  }
  openViewFood(food) {
    const dialogRef = this.dialog.open(ViewFoodComponent, { width: '900px', data: food });
  }
  deleteFood(food) {
    swal({
      title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ?',
      text: 'ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        // this.foodsRef.doc(food.id).delete();
      } else {
        return;
      }
    });
  }
  openAddExtendedFood(food) {
    console.log(food.extendedFoods);
    try {
      if (food.extendedFoods.length === 0) {
        const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
      } else if (food.extendedFoods == null) {
        const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
      } else {
        this.snackbarRef.open('Already have member, please use Other', 'Ok', { duration: 2000, verticalPosition: 'top' });
        return;
      }
    } catch (err) {
      const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
    }

  }
  openViewExtendedFood(food) {
    const dialogRef = this.dialog.open(ViewExtendedFoodComponent, { width: '800px', data: food });
  }
  searchBy(msg) {

  }
}

