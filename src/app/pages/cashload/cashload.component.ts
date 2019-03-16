import { FormGroup, FormControl } from '@angular/forms';
import { CloseBalanceComponent } from './../../dialogs/close-balance/close-balance.component';
import { CashLoad } from './../../interfaces/cashLoad';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpenCashComponent } from 'src/app/dialogs/open-cash/open-cash.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
declare var swal: any;
@Component({
  selector: 'app-cashload',
  templateUrl: './cashload.component.html',
  styleUrls: ['./cashload.component.css']
})
export class CashloadComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore, private snackbar: MatSnackBar) {

    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        return;
      } else {
        router.navigateByUrl('login');
      }
    });
    this.cashloadsRef = db.collection<CashLoad>('cashloads', ref => {
      return ref.orderBy('loadDateTime', 'asc');
    });
  }
  cashloadsRef: AngularFirestoreCollection<CashLoad>;
  cashloads: Observable<any[]>;
  private user: Observable<firebase.User>;
  username_info: any;
  ngOnInit() {

    this.cashloads = this.cashloadsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as CashLoad;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  openCash() {
    const dialogRef = this.dialog.open(OpenCashComponent, {
      width: '600px'
    });
  }
  removeCashLoad(cash) {
    if (cash) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          if (cash.closeApproved === true) {
            swal({
              title: 'ບໍ່ສາມາດລຶບໄດ້ ເພາະລາຍການຖືກປິດແລ້ວ',
              text: 'ລາຍການນີ້ ອະນຸມັດ ປິດສົມບູນແລ້ວ ບໍ່ສາມາດລຶບໄດ້ , ກະລຸນາຕິດຕໍ່ admin',
              icon: 'error'
            });
          } else {
            this.db.collection<CashLoad>('cashloads').doc(cash.id).delete().then(() => {
              this.snackbar.open('Record has been removed', 'OK', { duration: 1000 });
            });
          }

        }
      });
    }
  }
  openCloseBalance(cash) {
    if (!cash.close) {
      const dialogRef = this.dialog.open(CloseBalanceComponent, {
        width: '600px',
        data: cash
      });
    } else {
      swal({
        title: 'ລາຍການທັງໝົດ ປິດແລ້ວ',
        text: 'ບໍ່ສາມາດດຳເນິນການຕໍ່ໄດ້',
        icon: 'error',
      });
      return;
    }
  }
  approvedLoadCash(id) {
    if (id) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          this.db.collection<CashLoad>('cashloads').doc(id).get().subscribe((cashload) => { // closeby
            if (cashload.data().closeby !== localStorage.getItem('username')) {
              this.db.collection<CashLoad>('cashloads').doc(id).update({
                loadApproved: true,
                openAuthorizedBy: localStorage.getItem('username'),
              }).then(() => {
                this.snackbar.open('Operation success', 'OK', { duration: 1000 });
              });
            } else {
              swal({
                title: 'ທ່ານບໍ່ສາມາດທີ່ຈະອະນຸມັດໃຫ້ຕົນເອງໄດ້!',
                text: 'ບໍ່ສາມາດດຳເນິນການຕໍ່ໄດ້',
                icon: 'error',
              });
              return;
            }
          });
        }
      });

    }
  }
  closeApproved(id) {
    if (id) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດປິດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          this.db.collection<CashLoad>('cashloads').doc(id).get().subscribe((cashload) => {
            if (cashload.data().closeby !== localStorage.getItem('username')) {
              this.db.collection<CashLoad>('cashloads').doc(id).update({
                closeApproved: true,
                closeAuthorizedBy: localStorage.getItem('username'),
              }).then(() => {
                this.snackbar.open('Operation success', 'OK', { duration: 1000 });
              });
            } else {
              swal({
                title: 'ທ່ານບໍ່ສາມາດທີ່ຈະອະນຸມັດໃຫ້ຕົນເອງໄດ້!',
                text: 'ບໍ່ສາມາດດຳເນິນການຕໍ່ໄດ້',
                icon: 'error',
              });
            }
          });
        }
      });
    }
  }
}
