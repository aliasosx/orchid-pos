import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Promotion } from 'src/app/interfaces/promotions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-promotion-role',
  templateUrl: './promotion-role.component.html',
  styleUrls: ['./promotion-role.component.css']
})
export class PromotionRoleComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<PromotionRoleComponent>, private db: AngularFirestore, @Inject(MAT_DIALOG_DATA) public data) { }
  promotionFormRole: FormGroup;
  promotionsRef: AngularFirestoreCollection<Promotion>;
  promotions: Observable<any[]>;

  ngOnInit() {
    this.promotionFormRole = new FormGroup({
      foodId: new FormControl(),
      foodName: new FormControl(),
      quantity: new FormControl(),
    });
  }

}
