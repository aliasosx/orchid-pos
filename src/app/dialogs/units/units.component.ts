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

  constructor(private db: AngularFirestore, private snackbar: MatSnackBar) {
    this.unitsRef = db.collection<Unit>('units');
  }

  updateFlg = 'add';
  btnText = 'Add new';
  unitForm: FormGroup;
  unitsRef: AngularFirestoreCollection<Unit>;
  units: Observable<any[]>;

  unitId;

  ngOnInit() {
    this.unitForm = new FormGroup({
      id: new FormControl(),
      unitName: new FormControl(),
      unit: new FormControl(),
      valueInGram: new FormControl(0),
    });

    this.units = this.unitsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Unit;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
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
      this.db.collection<Unit>('units').doc(this.unitId).update(this.unitForm.value).then(() => {
        this.snackbar.open('Updated for id ' + this.unitId, 'OK', { duration: 1000 });
        this.updateFlg = 'add';
        this.unitId = '';
        this.btnText = 'Add new';
        this.unitForm.reset();
      });
    } else if (this.unitForm.valid && this.updateFlg === 'add') {
      this.db.collection<Unit>('units').add(this.unitForm.value).then(() => {
        this.snackbar.open('Unit added', 'OK', { duration: 1000 });
        this.updateFlg = 'add';
        this.unitId = '';
        this.btnText = 'Add new';
        this.unitForm.reset();
      });
    }
  }
  removeUnit(unit) {
    if (unit) {
      swal({
        title: 'ທ່ານຕ້ອງການລືບແທ້ບໍ?',
        text: 'ທ່ານບໍ່ສາມາດກູ້ຄືນຖ້າຫາກລຶບແລ້ວ',
        icon: "warning",
      }).then(value => {
        if (value) {
          this.db.collection<Unit>('units').doc(unit.id).delete().then(() => {
            this.snackbar.open('Unit deleted', 'OK', { duration: 1000 });
          });
        }
      });
    }
  }
}
