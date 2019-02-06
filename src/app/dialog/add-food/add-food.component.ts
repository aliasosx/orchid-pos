import { Food } from './../../interfaces/food';
import { Kitchen } from './../../interfaces/kitchen';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as uuid from 'uuid';
import { MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Currency } from 'src/app/interfaces/currency';
import { FoodCategory } from 'src/app/interfaces/foodCategory';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private dialogRef: MatDialogRef<AddFoodComponent>) {
    this.currenciesRef = db.collection<Currency>('currencies');
    this.kitchensRef = db.collection<Kitchen>('kitchens');
    this.categoriesRef = db.collection<FoodCategory>('food_categories');
    this.foodsRef = db.collection<Food>('foods');
  }


  addFoodForm: FormGroup;
  showAlert = "hidden";
  photoSrc = "../../../assets/images/icons/search.svg";
  saveDisabled = false;
  progressBarValue;

  currenciesRef: AngularFirestoreCollection<Currency>;
  Currencies: Observable<any[]>

  kitchensRef: AngularFirestoreCollection<Kitchen>;
  kitchens: Observable<any[]>;

  categoriesRef: AngularFirestoreCollection<FoodCategory>;
  categories: Observable<any[]>;

  foodsRef: AngularFirestoreCollection<Food>;

  ngOnInit() {
    const uuid1 = uuid.v1();;
    //console.log(uuid1);
    this.addFoodForm = new FormGroup({
      foodId: new FormControl(uuid1),
      food_name: new FormControl(),
      food_name_en: new FormControl(),
      food_photo: new FormControl(),
      food_category: new FormControl(),
      cost: new FormControl(0),
      price: new FormControl(0),
      currency: new FormControl('KIP'),
      parent_food: new FormControl(false),
      is_childFood: new FormControl(false),
      kitchen: new FormControl(),
      userName: new FormControl('administrator'),
      enabled: new FormControl(true),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });

    // Load startup
    this.Currencies = this.currenciesRef.valueChanges();
    this.kitchens = this.kitchensRef.valueChanges();
    this.categories = this.categoriesRef.valueChanges();

  }
  uploadPhoto(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      let file = selectedFiles.item(0);
      let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/foods/' + uniqkey, file);
      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.photoSrc = url; // Image url
          //console.log(url);
        })
      });
    }
  }
  createFood() {
    if (this.addFoodForm.valid) {
      this.addFoodForm.get('food_photo').setValue(this.photoSrc);
      this.saveDisabled = true;
      this.foodsRef.add(this.addFoodForm.value).then((res) => {
        this.dialogRef.close('success');
      });
    } else {
      this.saveDisabled = false;
      return;
    }

  }
}
