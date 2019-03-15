import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { Role } from 'src/app/interfaces/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.usersRef = db.collection<User>('users');
  }
  btnText = 'Reload Privilege';
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  ngOnInit() {
    this.users = this.usersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as User;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

  }
  showUserAdd(user) {
    // console.log(user);
    this.dialog.open(UserRegisterComponent, {
      width: '800px',
      data: user
    });
  }
  async reloadPrivilege() {
    this.btnText = 'Processing ...';
    let c = await this.db.collection<Role>('roles').get().subscribe(roles => {
      roles.docs.forEach(role => {
        this.db.collection<User>('users').get().subscribe(users => {
          users.docs.forEach(user => {
            if (user.data().role === role.id) {
              this.db.collection<User>('users').doc(user.id).update({
                menus: role.data().menus
              }).then((resp) => {
                this.btnText = 'Reload Privilege';
              });
            }
          });
        });
      });
    });
  }

}
