import { ApprovedUsersComponent } from './../../dialogs/approved-users/approved-users.component';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { CloseBalanceComponent } from './../../dialogs/close-balance/close-balance.component';
import { AngularFirestore, } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpenCashComponent } from 'src/app/dialogs/open-cash/open-cash.component';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StockEODAddComponent } from 'src/app/dialogs/stock-eodadd/stock-eodadd.component';
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

      return;
    } else {
      router.navigateByUrl('login');
    }
  }

  private user: Observable<firebase.User>;
  username_info: any;

  cashloads: any;

  ngOnInit() {
    this.loadCashStartUp();
  }

  async loadCashStartUp() {
    this.backendSrv.getCashload().then((cashload_resp) => {
      cashload_resp.subscribe(cashloads => {
        // console.log(cashloads);
        this.cashloads = cashloads;
      });
    });
  }
  openCash() {
    this.backendSrv.checkCashstat(JSON.parse(localStorage.getItem('usrObj')).id).then((st) => {
      st.subscribe(c => {
        if (parseInt(c['status'], 10) > 0) {
          swal({
            title: 'ທ່ານໄດ້ເອົາເງິນເຂົ້າ ລີ້ນຊັກແລ້ວ',
            text: 'ທ່ານສາມາດເອົາເງິນເຂົ້າລີ້ນຊັກ ໄດ້ພຽງ 1 ຄັ້ງ',
            icon: 'error',
          });
          return;
        } else {
          const dialogRef = this.dialog.open(OpenCashComponent, {
            width: '600px'
          });
          dialogRef.afterClosed().subscribe(async (resp) => {
            if (resp) {
              if (resp['status'] === 'success') {
                let c = await this.loadCashStartUp();
                this.createStockEOD(resp['cashId']);
              }
            } else {
              return;
            }
          });
        }
      });
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
          if (cash.closeApproved === 1) {
            swal({
              title: 'ບໍ່ສາມາດລຶບໄດ້ ເພາະລາຍການຖືກປິດແລ້ວ',
              text: 'ລາຍການນີ້ ອະນຸມັດ ປິດສົມບູນແລ້ວ ບໍ່ສາມາດລຶບໄດ້ , ກະລຸນາຕິດຕໍ່ admin',
              icon: 'error'
            });
          } else {
            this.backendSrv.removeCashload(cash.id).then(async (rsp) => {
              rsp.subscribe(async (rs) => {
                if (rs['status'] === 'success') {
                  let c = await this.loadCashStartUp();
                  swal({
                    title: 'ສຳເລັດ',
                    icon: 'success',
                    timer: 3000
                  });
                } else {
                  swal({
                    title: 'ທ່ານບໍ່ສາມາດລືບລາຍການທີ່ ອະນຸມັດແລ້ວໄດ້',
                    text: 'Cannot be delete record has been approved',
                    icon: 'error',
                    timer: 3000
                  });
                }
              });
            });
          }
        }
      });
    }
  }
  openCloseBalance(cash) {
    if (cash.staff === JSON.parse(localStorage.getItem('usrObj')).id && cash.loadApproved === 1 && cash.closeApproved === 0) {
      // Get Order no done
      this.backendSrv.getIncompleteOrder(JSON.parse(localStorage.getItem('usrObj')).id).then((resp_order_incomplete) => {
        resp_order_incomplete.subscribe(rsp => {
          if (parseInt(rsp['status'], 10) > 0 && rsp['status'] !== 'error') {
            swal({
              title: 'ມີລາຍການ Order ຄ້າງ ກະລຸນາກວດສອບໃໝ່',
              text: 'Order still pending please clear all Orders',
              icon: 'error',
            }).then(() => {
              this.router.navigateByUrl('orders');
            });
            return;
          } else {

            this.backendSrv.getPendingExpenditureByCashId(cash.id).then(rsp => {
              rsp.subscribe(cashExpPending => {
                if (cashExpPending[0].pendingExpenditure > 0) {
                  swal({
                    title: 'ມີລາຍຈ່າຍຄົງຄ້າງໃຫ້ກວດສອບ',
                    text: 'ມີລາຍຈ່າຍຄົງຄ້າງໃຫ້ກວດສອບ',
                    icon: 'error'
                  });
                  this.router.navigateByUrl('diaryExpenditure');
                  return;
                } else {
                  const dialogRef = this.dialog.open(CloseBalanceComponent, {
                    width: '600px',
                    data: cash
                  });
                  dialogRef.afterClosed().subscribe(c => {
                    if (c === 'success') {
                      this.loadCashStartUp();
                      this.snackbar.open('Batch has been closed', 'OK', { duration: 2000 });
                    }
                  });
                }
              });
            });
          }
        });
      });

    } else {
      swal({
        title: 'ບໍ່ທັນສາມາດປິດໄດ້ !!!',
        icon: 'error'
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
          const dialogRef = this.dialog.open(ApprovedUsersComponent, {
            width: '600px',
          });
          dialogRef.afterClosed().subscribe(resp => {
            if (resp.user) {
              const approveCash = {
                openAuthorizedBy: resp.user.id,
                openAuthorizedNameBy: resp.user.username,
                loadApproved: 1
              };
              this.backendSrv.cashLoadUpdate(id, approveCash).then((rs) => {
                rs.subscribe(r => {
                  this.loadCashStartUp();
                  this.snackbar.open('Operation success', 'OK', { duration: 1000 });
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

  closeApproved(cash) {
    if (cash.id && cash.closed === 1) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດປິດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          const dialogRef = this.dialog.open(ApprovedUsersComponent, {
            width: '600px',
            data: 'none',
          });
          dialogRef.afterClosed().subscribe(resp => {
            if (resp.user) {
              const approveCloseCash = {
                closeAuthorizedBy: resp.user.id,
                closeAuthorizedNameBy: resp.user.username,
                closeApproved: 1
              };
              this.backendSrv.cashLoadUpdate(cash.id, approveCloseCash).then((respx) => {
                respx.subscribe((x) => {
                  if (x) {
                    this.snackbar.open('Operation success', 'OK', { duration: 1000 });
                    this.loadCashStartUp();
                  }
                });
              });
            }
          });
        }
      });
    } else {
      swal({
        title: 'ຍັງບໍ່ສາມາດ ອະນຸມັດປິດລາຍການນີ້',
        icon: 'error',
        dangerMode: true,
      });
    }
  }
  createStockEOD(id) {
    const cashId = id;
    const dialogRef = this.dialog.open(StockEODAddComponent, {
      width: '800px',
      disableClose: true,
      data: {
        start: true,
        cashId: cashId
      }
    });
  }
  viewStocEOD(id) {
    const dialogRef = this.dialog.open(StockEODAddComponent, {
      width: '800px',
      disableClose: true,
      data: {
        start: false,
        cashId: id
      }
    });
  }
}
