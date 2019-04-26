import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddbomComponent } from 'src/app/dialogs/addbom/addbom.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Bom } from 'src/app/interfaces/bom';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BomService } from 'src/app/services/bom.service';
import { AddChildBomComponent } from 'src/app/dialogs/add-child-bom/add-child-bom.component';

declare var swal: any;

@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialog: MatDialog, private db: AngularFirestore, private snackbar: MatSnackBar, private be: BackendServiceService, private bomService: BomService) {
  }
  boms: any;
  ngOnInit() {
    this.loadBoms();
  }
  loadBoms() {
    this.bomService.getBoms().then(b => {
      b.subscribe(boms => {
        console.log(boms);
        this.boms = boms[0];
      });
    });
  }
  openAddBOM() {
    const dialogRef = this.dialog.open(AddbomComponent, {
      width: '600px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp = 'success') {
        this.loadBoms();
      } else {
        return;
      }
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
  toggleEnabled(id, value) {
    let cond = 0;
    if (value === 1) {
      cond = 0;
    } else if (value === 0) {
      cond = 1;
    }
    console.log(cond);
    const bom = {
      enabled: cond,
    };
    this.bomService.updateBoms(id, bom).then(rsp => {
      rsp.subscribe(r => {
        this.loadBoms();
        this.snackbar.open('updated', 'OK', { duration: 1000 });
      });
    });
  }
  openAddBomChild(bid) {
    const dialogRef = this.dialog.open(AddChildBomComponent, { width: '800px', data: bid });
  }
}
