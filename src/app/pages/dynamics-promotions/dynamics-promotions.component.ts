import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Promotion } from 'src/app/interfaces/promotions';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddPromotionComponent } from 'src/app/dialogs/add-promotion/add-promotion.component';
import { PromotionRoleComponent } from 'src/app/dialogs/promotion-role/promotion-role.component';

@Component({
  selector: 'app-dynamics-promotions',
  templateUrl: './dynamics-promotions.component.html',
  styleUrls: ['./dynamics-promotions.component.css']
})
export class DynamicsPromotionsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.promotionsRef = db.collection<Promotion>('promotions');
  }
  promotionsRef: AngularFirestoreCollection<Promotion>;
  promotions: Observable<any[]>;
  searchPromotion: any;
  ngOnInit() {
    this.promotions = this.promotionsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Promotion;
        data['id'] = a.payload.doc.id;
        console.log(data);
        return data;
      });
    }));
  }
  openPromotionNew() {
    const dialog = this.dialog.open(AddPromotionComponent, { width: '600px' });
  }
  deletePromotion(id) {
    if (id) {
      this.promotionsRef.doc(id).delete().then(r => {
        console.log('Delete done');
      });
    }
  }
  updateEnabled(id, enabled_sign) {
    let enabled;
    if (enabled_sign === true) {
      enabled = false;
    } else if (enabled_sign === false) {
      enabled = true;
    }
    const data = {
      enabled: enabled
    };
    this.promotionsRef.doc(id).update(data);
  }
  updatePromotion(promotion) {
    const dialogRef = this.dialog.open(AddPromotionComponent, {
      width: '600px',
      data: promotion
    });
  }
  openPromotionRole(id) {
    const dialogs = this.dialog.open(PromotionRoleComponent, { width: '600px', data: id });
  }
}
