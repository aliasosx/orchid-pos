import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-subfoods',
  templateUrl: './subfoods.component.html',
  styleUrls: ['./subfoods.component.css']
})
export class SubfoodsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<SubfoodsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar, private be: BackendServiceService) {
    this.foodsRef = db.collection<Food>('foods', ref => {
      return ref.where('id', '==', this.data.food.id);
    });
  }
  selectedSubfood: string;
  quantitySelected: number;

  btnDisable = false;
  pre_subfood: any;
  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  // extendedFoods
  extendedFoodList: any;
  subFoodsForm: FormGroup;
  username;

  subfoods: any;

  ngOnInit() {
    // load food data
    // console.log(this.data.food_name);
    this.subFoodsForm = new FormGroup({
      'id': new FormControl(this.data.food.id),
      'food': new FormControl(this.data.food.food_name),
      'subFood': new FormControl(),
      'cost': new FormControl(),
      'discount': new FormControl(0),
      'total_discount': new FormControl(0),
      'price': new FormControl(0),
      'quantity': new FormControl(1),
      'total': new FormControl(0),
      'username': new FormControl(this.data.username),
      'kitchen': new FormControl(),
      'foodId': new FormControl(this.data.food.id),
      'food_category': new FormControl(),
    });
    this.extendedFoodList = this.data.food.extendedFoods;
    this.getExtendedFoods();
  }
  async selectedFood(event) {
    this.selectedSubfood = event.target.options[event.target.options.selectedIndex].text;
    const c = await this.foodCalculation();
  }
  async quantitySelect() {
    // console.log(this.subFoodsForm.get('quantity').value);
    const c = await this.foodCalculation();
  }
  async foodCalculation() {
    const c = await this.be.getSubfoodsById(this.data.food.id).subscribe(sf => {
      sf.forEach(element => {
        if (element.subFoodName === this.selectedSubfood) {
          // console.log(element.sfId);
          this.pre_subfood = {
            food: this.data.food.food_name + ' - ' + this.selectedSubfood,
            food_name_en: this.data.food.food_name_en,
            subfoodId: element.sfId,
            quantity: this.subFoodsForm.get('quantity').value,
            price: element.price,
            cost: element.cost,
            discount: 0,
            total_discount: 0,
            total: element.price * this.subFoodsForm.get('quantity').value,
            kitchen: this.data.food.kitchenName,
            foodId: element.foodId,
            food_category: this.data.food.food_category,
            username: this.data.username,
          };
        }
      });
    });
  }

  async getExtendedFoods() {
    let c = await this.be.getSubfoodById(this.data.food.id).then((subfoods) => {
      subfoods.subscribe(sf => {
        this.subfoods = sf;
      });
    });
  }

  async addFood() {
    if (this.subFoodsForm.valid && this.pre_subfood) {
      this.btnDisable = true;
      // console.log(this.pre_subfood);
      this.dialogRef.close(this.pre_subfood);
    } else {
      this.snackbar.open('Data incomplete please check!', 'Fails', { duration: 1000, verticalPosition: 'top' });
    }
  }
}
