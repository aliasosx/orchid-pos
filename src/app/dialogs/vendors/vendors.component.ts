import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/interfaces/vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<VendorsComponent>, private db: AngularFirestore) {
    this.vendorsCollectRef = db.collection<Vendor>('vendors', ref => ref.orderBy('vendorId', 'asc'));
  }
  vendors: Observable<any[]>;
  vendorsCollectRef: AngularFirestoreCollection<Vendor>;
  vendorsDoc: AngularFirestoreDocument<Vendor>;

  ngOnInit() {
    this.vendors = this.vendorsCollectRef.valueChanges();
  }

}
