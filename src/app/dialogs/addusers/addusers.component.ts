import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  constructor() { }

  addUserForm: FormGroup;

  ngOnInit() {
    const uuid1 = uuid.v1();
    const uuid1Emp = uuid.v1();
    this.addUserForm = new FormGroup({
      userId: new FormControl(uuid1),
      userName: new FormControl(),
      password: new FormControl(),
      employeeCode: new FormControl(uuid1Emp),
      gender: new FormControl(),
      fullName: new FormControl(),
      photo: new FormControl(),
      dateOfbirth: new FormControl(),
      placeOfBirth: new FormControl(),
      idCardno: new FormControl(),
      tel: new FormControl(),
      mobile: new FormControl(),
      enabled: new FormControl(),
      registeringDate: new FormControl(new Date()),
      employedDate: new FormControl(new Date()),
    });

  }

}
