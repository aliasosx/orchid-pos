import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { CashLoad } from 'src/app/interfaces/cashLoad';

@Component({
  selector: 'app-close-balance',
  templateUrl: './close-balance.component.html',
  styleUrls: ['./close-balance.component.css']
})
export class CloseBalanceComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<CloseBalanceComponent>, @Inject(MAT_DIALOG_DATA) public data: CashLoad) { }
  _title = this.data.id;
  ngOnInit() {

  }

}
