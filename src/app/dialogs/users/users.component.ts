import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserServicesService } from 'src/app/services/common/user-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private dialog: MatDialog, private userServices: UserServicesService, private snackbar: MatSnackBar) { }
  btnText = 'Reload Privilege';
  users: any;

  ngOnInit() {
    this.userServices.getUsers().then((resp_usr => {
      resp_usr.subscribe(users => {
        this.users = users;
      });
    }));
  }
  showUserAdd(user) {
    this.dialog.open(UserRegisterComponent, {
      width: '800px',
      data: user
    });
  }
  userActivateToggle(user) {
    user.enabled = !user.enabled;
    if (user.enabled === true) {
      user.enabled = 1;
    } else if (user.enabled === false) {
      user.enabled = 0;
    }
    this.userServices.updateUser(user).then((resp_usr) => {
      resp_usr.subscribe(() => {
        this.snackbar.open('User toggle updated', 'OK', { duration: 1000 });
      });
    });
  }
}
