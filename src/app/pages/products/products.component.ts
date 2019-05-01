import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { AddProductsComponent } from 'src/app/dialogs/add-products/add-products.component';
import { ViewProductsComponent } from 'src/app/dialogs/view-products/view-products.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private router: Router, private be: BackendServiceService) {

    if (localStorage.getItem('token')) {
      this.username_info = localStorage.getItem('usrObj');
      return;
    } else {
      router.navigateByUrl('login');
    }

  }
  title = 'Products';
  productsRef: AngularFirestoreCollection<Product>;
  private productDoc: AngularFirestoreDocument<Product>;
  product: Product;
  products: Observable<any[]>;

  searchProduct: string;

  private user: Observable<firebase.User>;
  username_info: any;

  productsShow: any;

  ngOnInit() {
    this.products = this.db.collection('products', ref => {
      return ref.orderBy('createdAt', 'asc');
    }).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    this.loadProducts();
  }

  async loadProducts() {
    let a = this.be.getAllProducts().then(p => {
      p.subscribe(products => {
        this.productsShow = products;
      });
    });
  }
  reloadProduct() {
    this.loadProducts();
  }
  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'success') {
        this.loadProducts();
        swal('Products has been saved', 'Product add', 'success', { timer: 1500 });

      } else {
        return;
      }

    });
  }

  deleteProduct(product) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        /*
        this.db.collection('products').doc(product.id).delete();
        // swal('Products has been deleted', 'Product', 'success');
        */

        this.be.deleteProduct(product.pid).then(rsp => {
          rsp.subscribe(r => {
            if (r['status'] === 'success') {
              this.loadProducts();
              swal('Products has been deleted', 'Product', 'success', { timer: 1000 });
            } else {
              swal('Something went wrong !', 'Product', 'error', { timer: 1000 });
              return;
            }
          });
        });

      } else {
        swal('Delete canceled', 'Product', 'error', { timer: 1000 });
      }
    });
  }
  updateProduct(product) {
    const dialogRef = this.dialog.open(ViewProductsComponent, {
      width: '600px',
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'success') {
        this.loadProducts();
        swal('Product modified', 'Product has been updated', 'success', { timer: 1000 });
      }
    });
  }

}
