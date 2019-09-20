import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
declare var swal: any;
@Component({
  selector: 'app-add-ingredient-food',
  templateUrl: './add-ingredient-food.component.html',
  styleUrls: ['./add-ingredient-food.component.css']
})
export class AddIngredientFoodComponent implements OnInit {

  constructor(private bomServices: BomService, private backendService: BackendServiceService) { }
  ingredientFoodForm: FormGroup;
  packUnits: any;
  foods: any;
  subFoods: any;
  ingredients: any;
  selectedIngredient: any;
  foodTypes: any;
  foodType: any;
  viewItems: any;

  ngOnInit() {
    this.ingredientFoodForm = new FormGroup({
      id: new FormControl(),
      foodId: new FormControl(),
      subfoodId: new FormControl(16),
      ingredientId: new FormControl(),
      quantity: new FormControl(0),
      packUnitId: new FormControl(1),
      uniqueFoodKey: new FormControl(),
      enabled: new FormControl(1),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      usageDescribe: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });
    this.loadPackUnits();
    this.loadFoods();
    this.loadSubFoods();
    this.loadIngredients();
    this.loadFoodTypes();
  }
  loadPackUnits() {
    this.bomServices.getPackUnits().then(r => {
      r.subscribe(packUnits => this.packUnits = packUnits);
    });
  }
  loadFoods() {
    this.backendService.getFoods().then(r => {
      r.subscribe(foods => this.foods = foods);
    });
  }
  loadFoodTypes() {
    this.backendService.getFoodTypes().then(r => {
      r.subscribe(foodTypes => this.foodTypes = foodTypes);
    });
  }
  loadSubFoods() {
    this.backendService.getSubfoods().then(r => {
      r.subscribe(subfoods => this.subFoods = subfoods);
    });
  }
  loadIngredients() {
    this.bomServices.getIngredients().then(r => {
      r.subscribe(ingredients => this.ingredients = ingredients);
    });
  }
  onIngredientSelected(id) {
    this.bomServices.getIngredientById(id).then(r => {
      r.subscribe(ingredient => {
        this.selectedIngredient = ingredient;
        this.ingredientFoodForm.get('packUnitId').setValue(ingredient[0].packUnitId);
        // tslint:disable-next-line: max-line-length
        this.ingredientFoodForm.get('usageDescribe').setValue('ນຳໃຊ້ ' + ingredient[0].quantityPerUnit * (this.ingredientFoodForm.get('quantity').value) + ' ໜ່ວຍ');
        this.loadItems(ingredient[0].id);
      });
    });
  }
  quantityCalculation() {
    // tslint:disable-next-line: max-line-length
    this.ingredientFoodForm.get('usageDescribe').setValue('ນຳໃຊ້ ' + this.selectedIngredient[0].quantityPerUnit * (this.ingredientFoodForm.get('quantity').value) + ' ໜ່ວຍ');
  }
  loadItems(id) {
    this.bomServices.getingredientFoodsItemAddView(id).then(r => {
      r.subscribe(viewItems => this.viewItems = viewItems);
    });
  }
  addItem() {
    if (this.ingredientFoodForm.valid) {
      console.log(this.ingredientFoodForm.value);
      // tslint:disable-next-line: max-line-length
      this.ingredientFoodForm.get('uniqueFoodKey').setValue(this.ingredientFoodForm.get('foodId').value.toString() + this.ingredientFoodForm.get('subfoodId').value.toString() + this.ingredientFoodForm.get('ingredientId').value.toString());
      this.bomServices.createIngredientFood(this.ingredientFoodForm.value).then(r => {
        r.subscribe(ingredientFood => {
          if (ingredientFood['id']) {
            this.ingredientFoodForm.get('ingredientId').setValue(ingredientFood['ingredientId']);
            this.ingredientFoodForm.get('subfoodId').setValue(16);
            this.onIngredientSelected(ingredientFood['ingredientId']);
            this.loadItems(ingredientFood['ingredientId']);
          } else {
            swal({
              title: 'ອາຫານນີ້ມີແລ້ວ ກະລຸນາເລືອກ ອາຫານໃໝ່',
              icon: 'error',
              timer: 5000,
            });
          }
        });
      });
    }
  }
}
