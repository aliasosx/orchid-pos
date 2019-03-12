import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddbomComponent } from 'src/app/dialogs/addbom/addbom.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Bom } from 'src/app/interfaces/bom';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var swal: any;

@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {

  constructor(private dialog: MatDialog, private db: AngularFirestore, private snackbar: MatSnackBar) {
    this.bomsRef = db.collection<Bom>('boms');
  }

  bomsRef: AngularFirestoreCollection<Bom>;
  boms: Observable<any[]>;

  ngOnInit() {
    this.boms = this.bomsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const boms = a.payload.doc.data() as Bom;
        boms['id'] = a.payload.doc.id;
        return boms;
      });
    }));
  }
  openAddBOM() {
    this.dialog.open(AddbomComponent, {
      width: '800px'
    });
  }
  openUpdateBOM(bom) {
    this.dialog.open(AddbomComponent, {
      width: '800px',
      data: bom
    });
  }
  removeBom(id) {
    if (id) {
      swal({
        title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດລາຍການນີ້',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          this.db.collection<Bom>('boms').doc(id).delete().then(() => {
            this.snackbar.open('Items removed', 'OK', { duration: 1000 });
          });
        }
      });
    }
  }
}
