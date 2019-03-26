import { BackendServiceService } from './../../services/common/backend-service.service';
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
  constructor(private snackbarRef: MatSnackBar, private backendService: BackendServiceService) { }
  foodCateForm: FormGroup;
  disableSave = false;
  foodTypes: any;
  updateBtnDisabled = true;
  async ngOnInit() {
    this.foodCateForm = new FormGroup({
      'id': new FormControl(),
      'foodTypeName': new FormControl(),
      'foodTypeNameEn': new FormControl(),
      'enabled': new FormControl(0),
      'createdAt': new FormControl(),
      'updatedAt': new FormControl(),
    });

    let c = await this.loadStartUp();
    this.updateBtnDisabled = true;
  }
  async loadStartUp() {
    this.backendService.getFoodTypes().then(foodTypes => {
      foodTypes.subscribe(fts => {
        this.foodTypes = fts;
      });
    });
  }
  addUpdate(c) {
    this.disableSave = true;
    this.updateBtnDisabled = false;
    this.foodCateForm.setValue(c);
  }
  updateCat() {
    if (this.foodCateForm.valid) {
      this.backendService.updateFoodTypes(this.foodCateForm.get('id').value, this.foodCateForm.value).then(resp => {
        resp.subscribe(r => {
          if (r['status'] === 'success') {
            this.snackbarRef.open('added new Food types', 'OK', { duration: 2000 });
            this.loadStartUp();
            this.foodCateForm.reset();
            this.updateBtnDisabled = true;
            this.disableSave = false;
          }
        });
      });
    } else {
      this.snackbarRef.open('Something wrong', 'OK', { duration: 2000 });
      return;
    }
  }
  addNewCate() {
    console.log(this.foodCateForm.value);
    if (this.foodCateForm.valid) {
      this.backendService.createFoodTypes(this.foodCateForm.value).then((resp_ft => {
        resp_ft.subscribe(ft => {
          if (ft['status'] === 'success') {
            this.snackbarRef.open('added new Food types', 'OK', { duration: 2000 });
          }
        });
      }));
      this.foodCateForm.reset();

    } else {
      this.snackbarRef.open('Something wrong', 'OK', { duration: 2000 });
      return;
    }
  }
  deleteCat(cat) {
    if (cat) {
      swal({
        title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ?',
        text: 'ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {

        } else {
          return;
        }
      });
    }
  }
  enabledToggle(id, enabled) {
    const enabled_cat = !enabled;
    let enbr;
    if (enabled_cat === true) {
      enbr = 1;
    } else if (enabled_cat === false) {
      enbr = 0;
    }
    const foodType = {
      enabled: enbr
    };


    this.backendService.updateFoodTypes(id, foodType).then((resp_ft) => {
      resp_ft.subscribe(resp_ftt => {

        if (resp_ftt['status'] === 'success') {
          this.snackbarRef.open('Food Type updated ' + id, 'OK', { duration: 1000 });
          this.loadStartUp();
        } else {
          this.snackbarRef.open('Error', 'OK', { duration: 1000 });
          this.loadStartUp();
        }
      });
    });
  }
}
