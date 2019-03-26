import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ExtendedFoodType } from 'src/app/interfaces/extendedFoodType';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

declare var swal: any;

@Component({
  selector: 'app-extended-food-type',
  templateUrl: './extended-food-type.component.html',
  styleUrls: ['./extended-food-type.component.css']
})
export class ExtendedFoodTypeComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<ExtendedFoodTypeComponent>, private snackbarRef: MatSnackBar, private backendService: BackendServiceService) {

  }
  extendedFoodTypeForm: FormGroup;
  subFoods: any;

  disableUpdateBtn;
  disableSaveBtn;
  ngOnInit() {
    this.extendedFoodTypeForm = new FormGroup({
      'id': new FormControl(),
      'subFoodName': new FormControl(),
      'subFoodNameEn': new FormControl(),
      'enabled': new FormControl(1),
      'createdAt': new FormControl(new Date()),
      'updatedAt': new FormControl(new Date()),
    });
    this.loadStartUp();
    this.disableUpdateBtn = true;
    this.disableSaveBtn = false;
  }

  loadStartUp() {
    this.backendService.getSubFood().then((resp) => {
      resp.subscribe(r => {
        this.subFoods = r;
      });
    });
  }
  addNewExtendedFoodType() {
    if (this.extendedFoodTypeForm.valid) {
      this.backendService.createSubFood(this.extendedFoodTypeForm.value).then((resp) => {
        resp.subscribe(rs => {
          if (rs['status'] === 'success') {
            this.extendedFoodTypeForm.reset();
            this.snackbarRef.open('Add new food success', 'ok', { duration: 1000 });
            this.loadStartUp();
          }
        });
      });
    } else {
      this.snackbarRef.open('Something wrong!', 'Fail', { duration: 1000 });
      return;
    }
  }

  updateSubFood(subfood) {
    if (subfood) {
      this.disableSaveBtn = true;
      this.disableUpdateBtn = false;
      this.extendedFoodTypeForm.setValue(subfood);
    }
  }

  updateSubFoodBe() {
    if (this.extendedFoodTypeForm.valid) {
      this.disableUpdateBtn = true;
      this.backendService.updateSubFood(this.extendedFoodTypeForm.get('id').value, this.extendedFoodTypeForm.value).then((resp) => {
        resp.subscribe(rs => {
          if (rs['status'] === 'success') {
            this.snackbarRef.open('Update sub food success', 'ok', { duration: 1000 });
            this.disableUpdateBtn = true;
            this.disableSaveBtn = false;
            this.extendedFoodTypeForm.reset();
            this.loadStartUp();
          }
        });
      });
    }
  }
  deleteExtendedFoodType(ext) {
    if (ext) {
      swal({
        title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ?',
        text: 'ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {

          this.snackbarRef.open('Delete success', 'ok', { duration: 1000 });

        } else {
          return;
        }
      });
    }
  }
  enabledToggle(subfood) {
    let enblr;
    const enblrSf = !subfood.enabled;

    if (enblrSf === true) {
      enblr = 1;
    } else if (enblrSf === false) {
      enblr = 0;
    }
    const sf = {
      enabled: enblr
    };
    this.backendService.updateSubFood(subfood.id, sf).then((resp) => {
      resp.subscribe(rs => {
        this.snackbarRef.open('Update sub food success', 'ok', { duration: 1000 });
        this.loadStartUp();
      });
    });
  }
}
