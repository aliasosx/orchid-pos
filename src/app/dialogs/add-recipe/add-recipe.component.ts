import { Component, OnInit, Inject } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
declare var swal: any;
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, private dialogRef: MatDialogRef<AddRecipeComponent>, private backendService: BackendServiceService, @Inject(MAT_DIALOG_DATA) public data) {
    this.loadFoodName();
    this.loadFoodType();
    this.loadIngredients();
    this.loadSubFoods();
    this.loadPackUnits();
  }
  recipeForm: FormGroup;
  recipes: any;
  foods: any;
  foodTypes: any;
  foodType: any;
  ingredients: any;
  subfoods: any;
  recipeBuffer = [];
  recipeList: any[];
  selectedIngredient: any;
  disabledText = false;
  ingredientSelected: any;
  btnText = 'Create';
  packUnits: any;
  ings: any;
  packName = '';

  ngOnInit() {
    this.recipeForm = new FormGroup({
      recipeMasterId: new FormControl(),
      recipeName: new FormControl(),
      subfoodId: new FormControl(16),
      foodId: new FormControl(),
      ingredientId: new FormControl(),
      ingredientName: new FormControl(),
      packQuantity: new FormControl(),
      quantity: new FormControl(),
      unitId: new FormControl(1),
      unitName: new FormControl(),
      descriptions: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      enabled: new FormControl(1),
      packUnitId: new FormControl(),
      remark: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date())
    });
    if (this.data) {
      console.log(this.data);
      this.btnText = 'Update';
      localStorage.setItem('recipeName', JSON.stringify(this.data.recipeMaster.recipeName));
      localStorage.setItem('recipes', JSON.stringify(this.data.recipe));
      this.recipeForm.get('foodId').setValue(this.data.recipeMaster.foodId);
      this.loadTempIngredients();
    }
    this.loadTempIngredients();
  }
  loadFoodName() {
    this.backendService.getFoods().then(r => {
      r.subscribe(foods => this.foods = foods);
    });
  }
  loadFoodType() {
    this.backendService.getFoodTypes().then(r => {
      r.subscribe(foodTypes => this.foodTypes = foodTypes);
    });
  }
  loadIngredients() {
    this.bomService.getIngredients().then(r => {
      // console.log(this.ingredients);
      r.subscribe(ingredients => this.ingredients = ingredients);
    });
  }
  loadSubFoods() {
    this.backendService.getSubfoods().then(r => {
      r.subscribe(subfoods => this.subfoods = subfoods);
    });
  }
  loadPackUnits() {
    this.bomService.getPackUnits().then(r => {
      r.subscribe(packs => this.packUnits = packs);
    });
  }
  loadTempIngredients() {
    if (JSON.parse(localStorage.getItem('recipes'))) {
      this.recipeList = JSON.parse(localStorage.getItem('recipes'));
      this.recipeForm.get('recipeName').setValue(JSON.parse(localStorage.getItem('recipeName')));
      this.disabledText = true;
    } else {
      this.recipeList = null;
    }
  }
  addIngredient() {
    if (this.recipeForm.valid) {
      const buffer = [];
      let dup = -1;
      if (this.recipeList) {
        this.recipeList.forEach(element => {
          if (element.ingredientId === this.recipeForm.get('ingredientId').value) {
            swal({
              title: 'ບໍ່ສາມາດເອົາວັດຖຸດິບຊໍ້າກັນໄດ້',
              icon: 'error',
              timer: 3000,
            });
            dup = 1;
          } else {
            if (dup === -1) {
              buffer.push(element);
            }
          }
        });
        buffer.push(this.recipeForm.value);
        localStorage.setItem('recipes', JSON.stringify(buffer));
      } else {
        buffer.push(this.recipeForm.value);
        localStorage.setItem('recipeName', JSON.stringify(this.recipeForm.get('recipeName').value));
        localStorage.setItem('recipes', JSON.stringify(buffer));
      }
      this.loadTempIngredients();
    } else {
      console.log('Form invalid');
    }
  }
  getIngredientById(id) {
    this.bomService.getIngredientById(id).then(r => {
      r.subscribe(ingredient => {
        this.recipeForm.get('ingredientName').setValue(ingredient[0].ingredientName);
        this.recipeForm.get('unitId').setValue(1);
        this.recipeForm.get('packUnitId').setValue(ingredient[0].packUnitId);
        this.getUnitPackById(ingredient[0].packUnitId);
        // tslint:disable-next-line: max-line-length
        this.recipeForm.get('remark').setValue('ໃຊ້ ' + ingredient[0].quantityPerUnit + ' ' + this.recipeForm.get('unitName').value + ' ຕໍ່ ' + this.packName);
        this.ings = ingredient[0];
        this.getUnitNameById(1);
      });
    });
  }
  getUnitNameById(unitId) {
    this.backendService.getUnitById(unitId).then(r => {
      r.subscribe(unit => {
        this.recipeForm.get('unitName').setValue(unit['unit_name']);
      });
    });
  }
  getUnitPackById(id) {
    this.bomService.getPackUnitById(id).then(r => {
      r.subscribe(up => {
        this.packName = up[0].packUnitName;
      });
    });
  }
  removeItem(item) {
    let tmp = [];
    let clean = -1;
    if (item) {
      this.recipeList.forEach(element => {
        if (element.ingredientId !== item.ingredientId) {
          tmp.push(element);
          clean = 1;
        }
      });
      if (clean === 1) {
        localStorage.setItem('recipes', JSON.stringify(tmp));
        this.loadTempIngredients();
      } else if (clean === -1) {
        console.log('Remove last item');
        localStorage.removeItem('recipes');
        this.loadTempIngredients();
      }
    }
    this.loadTempIngredients();
  }
  saveRecipe() {
    this.bomService.createRecipeMaster(this.recipeForm.value).then(r => {
      r.subscribe(recipeMaster => {
        console.log(recipeMaster);
        if (recipeMaster['id'] > 0) {
          this.recipeList.forEach(element => {
            this.recipeForm.get('recipeMasterId').setValue(recipeMaster['id']);
            this.recipeForm.get('foodId').setValue(element['foodId']);
            this.recipeForm.get('quantity').setValue(element['quantity']);
            this.recipeForm.get('descriptions').setValue(element['descriptions']);
            this.recipeForm.get('ingredientId').setValue(element['ingredientId']);
            this.bomService.createRecipe(this.recipeForm.value).then(rx => {
              rx.subscribe(rsp => {
                console.log(rsp);
              });
            });
          });
        }
        localStorage.removeItem('recipes');
        localStorage.removeItem('recipeName');
        this.dialogRef.close('success');
      });
    });
  }
  quantityCalculation() {
    this.recipeForm.get('quantity').setValue(this.recipeForm.get('packQuantity').value * this.ings['quantityPerUnit']);
  }

}
