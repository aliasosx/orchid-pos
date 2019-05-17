import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from 'src/app/interfaces/order';
import { Observable, from } from 'rxjs';
import { map, filter, groupBy, mergeMap, toArray } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-kitchen-orders',
  templateUrl: './kitchen-orders.component.html',
  styleUrls: ['./kitchen-orders.component.css']
})
export class KitchenOrdersComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router, private be: BackendServiceService) {
    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      // this.getKitchenById(JSON.parse(localStorage.getItem('usrObj')).kitchenId);
      this.ordersRef = db.collection<Order>('orders', ref => {
        return ref.where('completed', '==', 0).orderBy('orderDateTime', 'asc');
      });
      return;
    } else {
      router.navigateByUrl('login');
    }
  }

  kitchenState;
  showList = '';
  private user: Observable<firebase.User>;
  username_info: any;
  ordersRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;

  kitchen = '';

  orderList: any[] = [];
  order_tracks: any;

  async ngOnInit() {
    let x = await this.getKitchenById(JSON.parse(localStorage.getItem('usrObj')).kitchenId);
  }
  async getKitchenById(id) {
    this.be.getKitchenById(id).then(async (rsp) => {
      rsp.subscribe(async (kitchen) => {
        this.kitchen = await kitchen['kitchenName'];
        this.orders = await this.ordersRef.snapshotChanges().pipe(map(change => {
          return change.map(a => {
            const orders = a.payload.doc.data() as Order;
            orders['id'] = a.payload.doc.id;
            orders['food'] = a.payload.doc.data().food.filter(b => b.kitchen.toUpperCase() === this.kitchen.toUpperCase());
            const sound = new Howl({
              src: ['../../../assets/sounds/Handbell-sound.mp3']
            });
            sound.play();
            return orders;
          });
        }));
        /*
        this.orders.subscribe(od => {
          od.forEach(o => {
            console.log(o);
          });
        });
        */
      });
    });
  }
}
