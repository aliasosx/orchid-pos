import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'firebase';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.css']
})
export class AddNewMemberComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<AddNewMemberComponent>, private backendServices: BackendServiceService, ) {
    this.loadCards();
    this.loadMemberCategories();
  }
  cards: any;
  memberForm: FormGroup;
  saveBtnDisabled = false;
  alertHide = true;
  errMsg: any;
  currentUser: User;
  memberCategories: any;
  ngOnInit() {
    this.memberForm = new FormGroup({
      cardId: new FormControl(),
      photo: new FormControl('../assets/img/1024px-Circle-icons-profile.svg.png'),
      userName: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      fullname: new FormControl(),
      dateOfBirth: new FormControl(),
      currentAddress: new FormControl(),
      provinceId: new FormControl(),
      mobile: new FormControl(),
      facebook: new FormControl(),
      idCard: new FormControl(),
      memberCategoryId: new FormControl(2),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
  }
  closeDialog() {
    this.dialogRef.close('cancel');
  }
  loadCards() {
    this.backendServices.getCardsAvailable().then(r => {
      r.subscribe(cards => this.cards = cards);
    });
  }

  saveMember() {
    if (this.memberForm.valid) {
      this.saveBtnDisabled = true;
      this.backendServices.saveMember(this.memberForm.value).then(r => {
        r.subscribe(member => {
          if (member['status'] !== 'error') {
            this.dialogRef.close(member);
          } else {
            this.errMsg = member;
            this.alertHide = false;
            this.saveBtnDisabled = false;
          }
        });
      });
    }
  }
  loadMemberCategories() {
    this.backendServices.getCategories().then(r => {
      r.subscribe(cat => this.memberCategories = cat);
    });
  }

}
