import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cancel-remarks',
  templateUrl: './cancel-remarks.component.html',
  styleUrls: ['./cancel-remarks.component.css']
})
export class CancelRemarksComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CancelRemarksComponent>) { }
  addRemarkForm: FormGroup;
  ngOnInit() {
    this.addRemarkForm = new FormGroup({
      remarks: new FormControl(),
    });
  }
  addRemark() {
    if (this.addRemarkForm.valid) {
      this.dialogRef.close(this.addRemarkForm.get('remarks').value);
    } else {
      alert('Add remark before close');
      return;
    }
  }

}
