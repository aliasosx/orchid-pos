import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as uuid from 'uuid';

import { UserServicesService } from 'src/app/services/common/user-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private storage: AngularFireStorage, private userService: UserServicesService, private backendServices: BackendServiceService
    , private dialogRef: MatDialogRef<UserRegisterComponent>, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  userRegistrationForm: FormGroup;
  photoSrc = '../../../assets/images/man01.png';

  message = '';
  showAlert = 'hidden';
  saveBtnDisable = true;

  showRole = 'hidden';
  messageTitle = 'ລົງທະບຽນ';
  buttonMessage = 'ບັນທືກ';

  updateFlag = false;

  progressBarValue;

  kitchens: any;
  roles: any;

  ngOnInit() {
    const uuid1Emp = uuid.v1();
    const uuid1usr = uuid.v1();
    const uuid1google = uuid.v1();
    const uuid1Id = uuid.v1();

    this.userRegistrationForm = new FormGroup({
      id: new FormControl(),
      employee_code: new FormControl(uuid1usr),
      gender: new FormControl(),
      username: new FormControl(),
      dateOfbirth: new FormControl(),
      fullname: new FormControl(),
      employed_date: new FormControl(new Date()),
      mobile: new FormControl(),
      photo: new FormControl(this.photoSrc),
      currentAddress: new FormControl(),
      idCardNumber: new FormControl(),
      password: new FormControl(),
      enabled: new FormControl(0),
      kitchenId: new FormControl(2),
      roleId: new FormControl(2),
      firstlogin: new FormControl(1),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });

    this.backendServices.getKitchens().then(kitchen_resp => {
      kitchen_resp.subscribe(kitchens => {
        this.kitchens = kitchens;
      });
    });
    this.backendServices.getRoles().then(roles_resp => {
      roles_resp.subscribe(roles => {
        this.roles = roles;
      });
    });

    if (this.data) {
      this.photoSrc = this.data.photo;
      this.showRole = '';
      this.userRegistrationForm.setValue(this.data);
      this.updateFlag = true;
      this.messageTitle = 'Update User information';
      this.buttonMessage = 'ແກ້ໄຂ';
      this.saveBtnDisable = false;
    } else {
      this.showRole = 'hidden';
    }
  }
  addUser() {
    if (this.updateFlag && this.data) {
      this.updateUser();
    } else {
      if (this.userRegistrationForm.valid) {
        this.saveBtnDisable = true;

        this.userService.createUser(this.userRegistrationForm.value).then(user_resp => {
          user_resp.subscribe(user => {
            if (user['status'] === 'success') {
              this.dialogRef.close('success');
            } else {
              this.message = 'Error happend';
              this.showAlert = '';
            }
          });
        });

      } else {
        this.snackbar.open('Please correct all input form', 'OK', { duration: 2000 });
      }
    }
  }
  checkPasswordIntegrity(e) {
    if (this.updateFlag) {
      return;
    }
    if (this.userRegistrationForm.get('password').value.trim() === e.target.value.trim()) {
      this.showAlert = 'hidden';
      this.saveBtnDisable = false;
    } else {
      this.saveBtnDisable = true;
      this.message = 'Password not match';
      this.showAlert = '';
    }
  }

  updateUser() {
    if (this.userRegistrationForm.valid) {
      this.saveBtnDisable = true;
      this.buttonMessage = 'Saving ...';

      this.userService.updateUser(this.userRegistrationForm.value).then((user_resp => {
        user_resp.subscribe((resp) => {
          if (resp['status'] === 'success') {
            this.dialogRef.close('success');
          }
        });
      })).catch((err) => {
        this.snackbar.open(err.message, 'OK', { duration: 5000 });
        this.saveBtnDisable = false;
      });
    }
  }
  uploadPhoto(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      const file = selectedFiles.item(0);
      const uniqkey = 'pic_' + this.userRegistrationForm.get('username').value + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/users/' + uniqkey, file);
      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.photoSrc = url;
          this.userRegistrationForm.get('photo').setValue(url);
        });
      });
    }
  }
}
