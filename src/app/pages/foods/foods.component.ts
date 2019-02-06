import { ViewFoodComponent } from './../../dialogs/view-food/view-food.component';
import { AddFoodComponent } from './../../dialogs/add-food/add-food.component';
import { Observable } from 'rxjs';
import { Food } from 'src/app/interfaces/food';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { AddExtendedFoodComponent } from 'src/app/dialogs/add-extended-food/add-extended-food.component';

declare var swal: any;

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.foodsRef = db.collection('foods');
  }

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;

  ngOnInit() {
    this.foods = this.db.collection('foods', ref => {
      return ref.orderBy('foodId', 'asc');
    }).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Food;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  openAddFood() {
    const dialogRef = this.dialog.open(AddFoodComponent, { width: '900px' });
  }
  openViewFood(food) {
    const dialogRef = this.dialog.open(ViewFoodComponent, { width: '900px', data: food });
  }
  deleteFood(food) {
    swal({
      title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
      text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.foodsRef.doc(food.id).delete();
      } else {
        return;
      }
    });
  }
  openAddExtendedFood(food) {
    const dialogRef = this.dialog.open(AddExtendedFoodComponent, { width: '800px', data: food });
  }
}

