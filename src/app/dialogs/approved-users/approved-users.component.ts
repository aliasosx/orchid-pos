import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})
export class ApprovedUsersComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private authService: AuthenticationService, private dialogRef: MatDialogRef<ApprovedUsersComponent>) { }
  approvedUsers: FormGroup;
  users: any;

  passwordShow = 'hidden';

  ngOnInit() {
    this.approvedUsers = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    this.loadUsers();
  }
  loadUsers() {
    this.backendService.getUsers().then((users) => {
      users.subscribe(u => {
        this.users = u;
      });
    });
  }
  enablePassword(e) {
    if (e) {
      this.passwordShow = '';
      console.log(e);
    }
  }
  authenticate() {
    if (this.approvedUsers.valid) {
      // console.log(this.approvedUsers.value);
      this.authService.login(this.approvedUsers.get('username').value, this.approvedUsers.get('password').value).then((resp) => {
        resp.subscribe(authUser => {
          if (authUser['token']) {
            this.dialogRef.close(authUser);
          } else {
            swal({
              title: 'ລະຫັດບໍ່ຖືກ ກະລຸນາລອງໃໝ່',
              text: 'Incorrect password please try again',
              icon: 'error',
            });
            return;
          }
        });
      });
    }
  }
}
