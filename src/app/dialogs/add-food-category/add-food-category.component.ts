import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FoodCategory } from 'src/app/interfaces/foodCategory';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

declare var swal: any;

@Component({
  selector: 'app-add-food-category',
  templateUrl: './add-food-category.component.html',
  styleUrls: ['./add-food-category.component.css']
})
export class AddFoodCategoryComponent implements OnInit {
  constructor(private db: AngularFirestore, private snackbarRef: MatSnackBar) {
    this.FoodCategoriesRef = db.collection<FoodCategory>('food_categories');
  }
  foodCateForm: FormGroup;
  disableSave = false;
  FoodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>
  docId: string;
  ngOnInit() {
    this.foodCateForm = new FormGroup({
      'id': new FormControl(),
      'foodCategoryName': new FormControl(),
      'foodCategoryNameLao': new FormControl(),
    });
    //this.FoodCategories = this.FoodCategoriesRef.valueChanges();
    this.FoodCategories = this.FoodCategoriesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as FoodCategory;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  addUpdate(c) {
    this.docId = c.id;
    this.foodCateForm.setValue(c);
  }
  updateCat() {
    if (this.foodCateForm.valid) {
      this.FoodCategoriesRef.doc(this.docId).update(this.foodCateForm.value).then(() => {
        this.snackbarRef.open('Updated', 'OK', { duration: 2000 });
      }).catch((err) => {
        this.snackbarRef.open(err, 'fail', { duration: 2000 });
      });
    } else {
      this.snackbarRef.open('Something wrong', 'OK', { duration: 2000 });
      return;
    }
  }
  addNewCate() {
    console.log(this.foodCateForm.value);
    if (this.foodCateForm.valid) {
      this.FoodCategoriesRef.add(this.foodCateForm.value).then((res) => {
        this.snackbarRef.open('Added successfull', 'Ok', {
          duration: 2000,
        });
        this.foodCateForm.reset();
      });
    } else {
      this.snackbarRef.open('Something wrong', 'OK', { duration: 2000 });
      return;
    }
  }
  deleteCat(cat) {
    if (cat) {
      swal({
        title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
        text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {
          this.FoodCategoriesRef.doc(cat.id).delete();
        } else {
          return;
        }
      });
    }
  }
}
