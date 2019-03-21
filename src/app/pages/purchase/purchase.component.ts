import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { Purchase } from 'src/app/interfaces/purchase';
import { Observable } from 'rxjs';
import { AddPurchaseComponent } from 'src/app/dialogs/add-purchase/add-purchase.component';
import { ViewPurchaseComponent } from 'src/app/dialogs/view-purchase/view-purchase.component';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private router: Router) {


    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      return;
    } else {
      router.navigateByUrl('login');
    }



    this.purchasesRef = db.collection<Purchase>('purchases');
  }
  private user: Observable<firebase.User>;
  username_info: any;
  purchasesRef: AngularFirestoreCollection<Purchase>;
  purchaseDoc: AngularFirestoreDocument<Purchase>;
  purchases: Observable<any[]>;

  ngOnInit() {
    this.purchases = this.db.collection('purchases').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Purchase;
        data['id'] = a.payload.doc.id;
        return data;
      })
    }))
  }
  addPurchase() {
    const dialogAddRef = this.dialog.open(AddPurchaseComponent, {
      width: '600px',
    });
  }
  deletePurchase(purchase) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.db.collection('purchases').doc(purchase.id).delete();
        swal('purchases has been deleted', 'Purchase', 'success');
      } else {
        //swal("Delete canceled");
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
      if (res == 'success') {
        swal('Purchase has been saved', 'Test', 'success');
      }
    })
  }

}
