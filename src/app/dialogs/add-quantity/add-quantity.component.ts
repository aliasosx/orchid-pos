import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.css']
})
export class AddQuantityComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddQuantityComponent>) { }

  addQuantityForm: FormGroup;

  ngOnInit() {
    this.addQuantityForm = new FormGroup({
      'quantity': new FormControl()
    });
  }
  addQuantity(q) {
    if (q) {
      this.dialogRef.close(q);
    }
  }

}
