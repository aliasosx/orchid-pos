import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FoodCategory } from 'src/app/interfaces/foodCategory';

@Component({
  selector: 'app-add-food-category',
  templateUrl: './add-food-category.component.html',
  styleUrls: ['./add-food-category.component.css']
})
export class AddFoodCategoryComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.FoodCategoriesRef = db.collection<FoodCategory>('food_categories');
  }
  foodCateForm: FormGroup;
  disableSave = false;
  FoodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>

  ngOnInit() {
    this.foodCateForm = new FormGroup({
      'foodCategoryName': new FormControl(),
      'foodCategoryNameLao': new FormControl(),
    });
    this.FoodCategories = this.FoodCategoriesRef.valueChanges();
  }
  addUpdate(c) {
    this.foodCateForm.setValue(c);
  }

}
