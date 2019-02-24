import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddbomComponent } from 'src/app/dialogs/addbom/addbom.component';

@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openAddBOM() {
    this.dialog.open(AddbomComponent, {
      width: '800px'
    });
  }
}
