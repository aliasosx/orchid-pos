import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatTooltip } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StaffBenefit } from 'src/app/interfaces/staffBenefit';
import { Observable } from 'rxjs';
import { Food } from 'src/app/interfaces/food';
import { map } from 'rxjs/operators';

declare var swal: any;

@Component({
  selector: 'app-staff-benefit',
  templateUrl: './staff-benefit.component.html',
  styleUrls: ['./staff-benefit.component.css']
})
export class StaffBenefitComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StaffBenefitComponent>, private db: AngularFirestore, private snackbar: MatSnackBar) {
    this.foodsRef = db.collection<Food>('foods');
    this.staffBenefitsRef = db.collection<StaffBenefit>('staffBenefits', ref => {
      return ref.orderBy('createdAt', 'asc');
    });
  }

  addNewStaffBenefitForm: FormGroup;

  staffBenefitsRef: AngularFirestoreCollection<StaffBenefit>;
  staffBenefits: Observable<any[]>;

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  addBtnDisable;

  ngOnInit() {
    this.addNewStaffBenefitForm = new FormGroup({
      id: new FormControl(),
      food: new FormControl(),
      discount: new FormControl(0),
      enabled: new FormControl(true),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
      username: new FormControl(localStorage.getItem('username')),
    });
    this.foods = this.foodsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const foods = a.payload.doc.data() as Food;
        foods['id'] = a.payload.doc.id;
        return foods;
      });
    }));

    this.staffBenefits = this.staffBenefitsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const staffBenefit = a.payload.doc.data() as StaffBenefit;
        staffBenefit['id'] = a.payload.doc.id;
        return staffBenefit;
      });
    }));
  }
  addStaffBenefit() {
    if (this.addNewStaffBenefitForm.valid && this.addNewStaffBenefitForm.get('discount').value > 0 && this.addNewStaffBenefitForm.get('food').value) {
      this.db.collection('staffBenefits').add(this.addNewStaffBenefitForm.value).then(() => {
        this.snackbar.open('added', 'OK', { duration: 1000 });
      });
    } else {
      this.snackbar.open('Data Incorrect !!!', 'OK', { duration: 2000 });
    }
  }
  async onselectedFood(e) {
    //this.addBtnDisable = true;
    let c = await this.db.collection<Food>('foods').doc(e).get().subscribe(food => {
      this.db.collection<StaffBenefit>('staffBenefits').get().subscribe(async (staffBe) => {
        staffBe.docs.forEach(s => {
          if (s.data().food.foodId === food.data().foodId) {
            this.addBtnDisable = true;
            this.snackbar.open('Duplicate food !!!', 'OK', { duration: 2000 });
            return;
          } else if (s.data().food.foodId != food.data().foodId) {
            this.addNewStaffBenefitForm.get('food').setValue(food.data());
            this.addBtnDisable = false;
          }
        });
      });
    });
  }
  enableToggle(staffbe) {
    this.db.collection<StaffBenefit>('staffBenefits').doc(staffbe.id).update({
      'enabled': !staffbe.enabled,
      'username': localStorage.getItem('username')
    }).then(() => {

    });
  }
  removeItem(staffbe) {
    swal({
      title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
      text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.staffBenefitsRef.doc(staffbe.id).delete();
      } else {
        return;
      }
    });
  }
}
