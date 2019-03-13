import { User } from 'src/app/interfaces/user';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/interfaces/role';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dbconsole',
  templateUrl: './dbconsole.component.html',
  styleUrls: ['./dbconsole.component.css']
})
export class DbconsoleComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.rolesRef = db.collection<Role>('roles');
  }
  disableBtn = false;
  btnTxt = 'Process';

  rolesRef: AngularFirestoreCollection<Role>;
  roles: Observable<any[]>;
  consoleText = '';
  ngOnInit() {
    this.roles = this.rolesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Role;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

  }
  async updateTransactionsLogfix() {
    this.disableBtn = true;
    this.btnTxt = 'Processing ... ';

    // add menu to Users

    let c = await this.db.collection<Role>('roles').get().subscribe(roles => {
      roles.docs.forEach(role => {
        this.db.collection<User>('users').get().subscribe(users => {
          users.docs.forEach(user => {
            if (user.data().role === role.id) {
              this.db.collection<User>('users').doc(user.id).update({
                menus: role.data().menus
              }).then((resp) => {
                console.log(resp);
              });
            }
          });
        });
      });
    });
  }
}
