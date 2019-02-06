import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FoodCategory } from './../../interfaces/foodCategory';
import { Kitchen } from './../../interfaces/kitchen';
import { Currency } from './../../interfaces/currency';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { Food } from 'src/app/interfaces/food';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<ViewFoodComponent>, private storage: AngularFireStorage, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currenciesRef = db.collection<Currency>('currencies');
    this.kitchensRef = db.collection<Kitchen>('kitchens');
    this.categoriesRef = db.collection<FoodCategory>('food_categories');
    this.foodsRef = db.collection<Food>('foods');
  }
  addFoodForm: FormGroup;
  progressBarValue;
  photoSrc = "../../../assets/images/icons/search.svg";

  currenciesRef: AngularFirestoreCollection<Currency>;
  Currencies: Observable<any[]>

  kitchensRef: AngularFirestoreCollection<Kitchen>;
  kitchens: Observable<any[]>;

  categoriesRef: AngularFirestoreCollection<FoodCategory>;
  categories: Observable<any[]>;

  foodsRef: AngularFirestoreCollection<Food>;

  saveDisabled = false;

  ngOnInit() {
    this.addFoodForm = new FormGroup({
      id: new FormControl(),
      foodId: new FormControl(),
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
    this.photoSrc = this.data.food_photo;
    this.addFoodForm.setValue(this.data);
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

  updateFood() {
    this.saveDisabled = true;
    if (this.addFoodForm.valid) {
      this.db.collection('foods').doc(this.data.id).update(this.addFoodForm.value);
      this.dialogRef.close('success');
    } else {
      this.saveDisabled = false;
      return;
    }
  }
}
