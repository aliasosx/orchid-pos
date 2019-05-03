import { ApprovedUsersComponent } from './../../dialogs/approved-users/approved-users.component';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AddPurchaseComponent } from 'src/app/dialogs/add-purchase/add-purchase.component';
import { ViewPurchaseComponent } from 'src/app/dialogs/view-purchase/view-purchase.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private router: Router, private be: BackendServiceService) {
    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      return;
    } else {
      router.navigateByUrl('login');
    }

  }
  private user: Observable<firebase.User>;
  username_info: any;

  purchases: any;

  ngOnInit() {
    this.loadPurchase();
  }

  async loadPurchase() {
    this.be.getPurchaseShow().then(rsp => {
      rsp.subscribe(r => {
        console.log(r);
        this.purchases = r;
      });
    });
  }
  addPurchase() {
    const dialogAddRef = this.dialog.open(AddPurchaseComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogAddRef.afterClosed().subscribe(() => {
      this.loadPurchase();
    });
  }
  deletePurchase(purchase) {
    swal({
      title: 'ທ່ານແນ່ໃຈບໍ?',
      text: 'ການລຶບ ແມ່ນບໍ່ສາມາດກູ້ຄຶນໄດ້ !',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.be.deletePurchase(purchase.pid).then(rsp => {
          rsp.subscribe(r => {
            if (r['status'] === 'success') {
              this.loadPurchase();
              swal('ລາຍການຖືກລຶບແລ້ວ', 'ລາຍການຊື້ຂາຍຖືກລຶບແລ້ວ', 'success', { timer: 1000 });
            } else {
              swal('ບໍ່ສາມາດລຶືບລາຍການນີ້ໄດ້', 'ບໍ່ສາມາດລຶບລາຍການທີ່ຖືກອະນຸມັດແລ້ວໄດ້ ຫຼ​ື ມີລາຍການໃນບິນຄ້າງ', 'error', { timer: 2000 });
            }
          });

        });

      } else {
        return;
      }
    });
  }
  updatePurchase(purchase) {
    const dialogRef = this.dialog.open(ViewPurchaseComponent, {
      width: '600px',
      data: purchase
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'success') {
        swal('Purchase has been saved', 'Test', 'success', { timer: 1000 });
      }
    });
  }
  viewPurchase(purchase) {
    const dialogRef = this.dialog.open(AddPurchaseComponent, {
      width: '800px',
      data: purchase,
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.purchases();
    });
  }
  approvedLoadPurchase(id) {
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
              const approvePurchase = {
                approveBy: resp.user.id,
                approveNameBy: resp.user.username,
                approvedDate: new Date(),
                approved: 1
              };
              this.be.approvePurchase(id, approvePurchase).then((rsp) => {
                rsp.subscribe(r => {
                  console.log(r);
                  if (r['status'] === 'success') {
                    swal('Approved', 'Purchase approved by ' + resp.user.username, 'success', { timer: 1000 });
                    this.loadPurchase();
                  } else {
                    swal('Cannot be process !', 'Error happend please check with admin', 'error', { timer: 1000 });
                  }
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
}
