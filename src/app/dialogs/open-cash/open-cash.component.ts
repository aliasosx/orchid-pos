import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-open-cash',
  templateUrl: './open-cash.component.html',
  styleUrls: ['./open-cash.component.css']
})
export class OpenCashComponent implements OnInit {

  constructor() { }
  addCashload: FormGroup;
  ngOnInit() {
    this.addCashload = new FormGroup({
      loadDateTime: new FormControl(new Date),
      initBalance: new FormControl(),
      openAuthorizedBy: new FormControl(),
      eodCashBalance: new FormControl(),
      eodBankBalance: new FormControl(),
      cashBalance: new FormControl(),
      bankBalance: new FormControl(),
      close: new FormControl(),
      closeDatetime: new FormControl(),
      closeby: new FormControl(),
      closeAuthorizedBy: new FormControl(),
    });
  }

}
