import { ApprovedUsersComponent } from './../../dialogs/approved-users/approved-users.component';
import { BackendServiceService } from './../../services/common/backend-service.service';
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
import { Order } from 'src/app/interfaces/order';
declare var swal: any;
@Component({
  selector: 'app-cashload',
  templateUrl: './cashload.component.html',
  styleUrls: ['./cashload.component.css']
})
export class CashloadComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore, private snackbar: MatSnackBar, private backendSrv: BackendServiceService) {
    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      this.cashloadsRef = db.collection<CashLoad>('cashloads', ref => {
        return ref.orderBy('loadDateTime', 'asc');
      });
      return;
    } else {
      router.navigateByUrl('login');
    }
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
        title: 'ແນ່ໃຈວ່າຈະ ລຶບລາຍກາຍນີ້',
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
            this.backendSrv.removeCashload(cash.cashloadId).then((rsp) => {
              rsp.subscribe(rs => {
                if (rs['status'] === 'success') {
                  this.db.collection<CashLoad>('cashloads').doc(cash.id).delete().then(() => {
                    this.snackbar.open('Record has been removed', 'OK', { duration: 1000 });
                  });
                } else {
                  this.snackbar.open('Record cannot be remove', 'Fail', { duration: 1000 });
                }
              });
            });
          }
        }
      });
    }
  }
  openCloseBalance(cash) {
    if (cash.closeby === localStorage.getItem('username')) {
      let c = this.db.collection<Order>('orders', ref => {
        return ref.where('completed', '==', false).where('username', '==', localStorage.getItem('username'));
      }).snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Order;
          data['id'] = a.payload.doc.id;
          return data;
        });
      }));

      c.subscribe(order => {
        console.log(order.length);
        if (order.length > 0) {
          swal({
            title: 'ມີລາຍການ Order ຄ້າງ ກະລຸນາກວດສອບໃໝ່',
            text: 'Order still pending please clear all Orders',
            icon: 'error',
          });
          return;
        } else {
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
      });
    } else {
      swal({
        title: 'ກະລຸນາເລຶອກລາຍການຂອງທ່ານເອງ',
        icon: 'error'
      });
      return;
    }
  }
  approvedLoadCash(id, cashloadId) {
    if (id) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {

          const dialogRef = this.dialog.open(ApprovedUsersComponent, {
            width: '600px',
          });

          dialogRef.afterClosed().subscribe(resp => {
            // console.log(resp.user);
            if (resp.user) {
              const approveCash = {
                openAuthorizedBy: resp.user.id,
                loadApproved: 1
              };
              this.backendSrv.cashLoadUpdate(cashloadId, approveCash).then((rs) => {
                rs.subscribe(r => {
                  this.db.collection<CashLoad>('cashloads').doc(id).get().subscribe((cashload) => { // closeby
                    this.db.collection<CashLoad>('cashloads').doc(id).update({
                      loadApproved: true,
                      openAuthorizedBy: resp.user.username,
                    }).then(() => {
                      this.snackbar.open('Operation success', 'OK', { duration: 1000 });
                    });
                  });
                });
              });
            } else {
              return;
            }
          });
        }
      });
    }
  }
  closeApproved(id, cashloadId, closedFlg) {
    if (id && closedFlg === 1) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດປິດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          const dialogRef = this.dialog.open(ApprovedUsersComponent, {
            width: '600px',
          });
          dialogRef.afterClosed().subscribe(resp => {
            if (resp.user) {
              const approveCloseCash = {
                closeAuthorizedBy: resp.user.id,
                closeApproved: 1
              };
              this.backendSrv.cashLoadUpdate(cashloadId, approveCloseCash).then((rs) => {
                rs.subscribe(r => {
                  this.db.collection<CashLoad>('cashloads').doc(id).get().subscribe((cashload) => {
                    if (cashload.data().closeby !== localStorage.getItem('username')) {
                      this.db.collection<CashLoad>('cashloads').doc(id).update({
                        closeApproved: true,
                        closeAuthorizedBy: resp.user.username,
                      }).then(() => {
                        this.snackbar.open('Operation success', 'OK', { duration: 1000 });
                      });
                    }
                  });
                });
              });
            }
          });
        }
      });
    } else {
      swal({
        title: 'ລາຍການຍັງບໍ່ທັນປິດ ກະລຸນາປິດກ່ອນ',
        icon: 'error'
      });
      return;
    }
  }
}
