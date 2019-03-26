import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Unit } from 'src/app/interfaces/unit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

declare var swal: any;

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private backendSevice: BackendServiceService) {

  }

  updateFlg = 'add';
  btnText = 'Add new';
  unitForm: FormGroup;
  units: any;
  unitId;

  ngOnInit() {
    this.unitForm = new FormGroup({
      id: new FormControl(),
      unit_name: new FormControl(),
      unit: new FormControl(),
      enabled: new FormControl(),
      userId: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });
    this.loadStartrUp();
  }

  loadStartrUp() {
    this.backendSevice.getUnit().then((units_rsp) => {
      units_rsp.subscribe(rs => {
        this.units = rs;
      });
    });
  }
  updateClickUnit(unit) {
    if (unit) {
      this.unitForm.setValue(unit);
      this.updateFlg = 'update';
      this.unitId = unit.id;
      this.btnText = 'Update';
    }
  }
  updateUnit() {
    if (this.unitForm.valid && this.updateFlg === 'update' && this.unitId) {

      this.snackbar.open('Updated for id ' + this.unitId, 'OK', { duration: 1000 });
      this.updateFlg = 'add';
      this.unitId = '';
      this.btnText = 'Add new';
      this.unitForm.reset();

    } else if (this.unitForm.valid && this.updateFlg === 'add') {

      this.snackbar.open('Unit added', 'OK', { duration: 1000 });
      this.updateFlg = 'add';
      this.unitId = '';
      this.btnText = 'Add new';
      this.unitForm.reset();

    }
  }
  removeUnit(unit) {
    if (unit) {
      swal({
        title: 'ທ່ານຕ້ອງການລືບແທ້ບໍ?',
        text: 'ທ່ານບໍ່ສາມາດກູ້ຄືນຖ້າຫາກລຶບແລ້ວ',
        icon: 'warning',
      }).then(value => {
        if (value) {

          this.snackbar.open('Unit deleted', 'OK', { duration: 1000 });

        }
      });
    }
  }
}
