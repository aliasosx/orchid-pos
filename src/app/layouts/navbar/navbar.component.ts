import { RestaurantInfo } from './../../interfaces/restaurantInfo';
import { Webmenu } from './../../interfaces/webmenu';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NewpasswordComponent } from 'src/app/dialogs/newpassword/newpassword.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var swal: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router, private dialog: MatDialog, private authService: AuthenticationService) {
    if (localStorage.getItem('usrObj')) {
      this.navBarShow = '';
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      this.username = this.username_info.username;
      this.restaurantInfoRef = db.collection<RestaurantInfo>('restaurant_info');
      this.loadMenus();
    } else {
      this.navBarShow = 'hidden';
      router.navigateByUrl('login');
    }
  }

  navBarShow = '';

  private user: Observable<firebase.User>;
  username_info: any;
  username;
  googleId: string;
  title = 'Letter\'P restaurant';
  menusRef: AngularFirestoreCollection<Webmenu>;
  menus: Observable<any[]>;

  restaurantInfoRef: AngularFirestoreCollection<RestaurantInfo>;
  RestaurantInfos: Observable<any[]>;

  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  currentRole: string;
  menusByRoles: any[] = [];

  userMenus: any;

  ngOnInit() {
    this.RestaurantInfos = this.restaurantInfoRef.valueChanges();
    this.loadMenus();
  }

  loadMenus() {
    this.userMenus = [];
    this.authService.getMenuByUsrId().then(menus => {
      menus.subscribe(m => {
        // console.log(m);
        this.userMenus = m;
      });
    });
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('kitchen');
    localStorage.removeItem('usrObj');
    localStorage.removeItem('token');
    this.navBarShow = 'hidden';
    this.router.navigateByUrl('login');
  }
  openNewPassword() {
    const dialogRef = this.dialog.open(NewpasswordComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      let currUser = this._firebaseAuth.auth.currentUser;
      currUser.updatePassword(result).then(() => {
        swal({
          title: 'password update successful',
          icon: 'success'
        });
      }).catch((err) => {
        swal({
          icon: 'error',
          title: err.message,
        });
      });
    });
  }
}
