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

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<ExtendedFoodTypeComponent>, private snackbarRef: MatSnackBar) {
    this.extendedFoodTypesRef = db.collection('extendedFoodTypes');
  }
  extendedFoodTypesRef: AngularFirestoreCollection<ExtendedFoodType>;
  extendedFoodTypes: Observable<any[]>;

  extendedFoodTypeForm: FormGroup;

  ngOnInit() {
    this.extendedFoodTypeForm = new FormGroup({
      'extendedFoodName': new FormControl(),
      'extendedFoodName_lao': new FormControl(),
      'enabled': new FormControl(true),
      'createdAt': new FormControl(new Date()),
      'updateAt': new FormControl(new Date()),
    });
    this.extendedFoodTypes = this.extendedFoodTypesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as ExtendedFoodType;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  addNewExtendedFoodType() {
    if (this.extendedFoodTypeForm.valid) {
      this.extendedFoodTypesRef.add(this.extendedFoodTypeForm.value).then(() => {
        this.extendedFoodTypeForm.reset();
        this.snackbarRef.open('Add new food success', 'ok', { duration: 1000 });
      });
    } else {
      this.snackbarRef.open('Something wrong!', 'Fail', { duration: 1000 });
      return;
    }
  }
  deleteExtendedFoodType(ext) {
    if (ext) {
      swal({
        title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
        text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {
          this.extendedFoodTypesRef.doc(ext.id).delete().then(() => {
            this.snackbarRef.open('Delete success', 'ok', { duration: 1000 });
          });
        } else {
          return;
        }
      });
    }
  }
}
