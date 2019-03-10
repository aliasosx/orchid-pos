import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OpenCashComponent } from 'src/app/dialogs/open-cash/open-cash.component';

@Component({
  selector: 'app-cashload',
  templateUrl: './cashload.component.html',
  styleUrls: ['./cashload.component.css']
})
export class CashloadComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openCash() {
    const dialogRef = this.dialog.open(OpenCashComponent, {
      width: '600px'
    });
  }
}
