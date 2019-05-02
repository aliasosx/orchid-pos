import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})
export class ApprovedUsersComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private authService: AuthenticationService, private dialogRef: MatDialogRef<ApprovedUsersComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  approvedUsers: FormGroup;
  users: any;

  passwordShow = 'hidden';
  flagOwnApprove = true;

  ngOnInit() {
    this.approvedUsers = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    if (this.data === 'none') {
      this.flagOwnApprove = false;
    }
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
      if (e === JSON.parse(localStorage.getItem('usrObj')).username && this.flagOwnApprove === false) {
        swal({
          title: 'ທ່ານບໍ່ສາມາດອະນຸມັດໃຫ້ຕົນເອງໄດ້ ກະລຸນາເລືອກ ຜູ້ໃຊ້ອື່ນ',
          text: 'Cannot approve yourself , please select other',
          icon: 'error',
        });
        this.passwordShow = 'hidden';
        return;
      } else {
        this.passwordShow = '';
      }
    }
  }
  authenticate() {
    if (this.approvedUsers.valid) {
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
