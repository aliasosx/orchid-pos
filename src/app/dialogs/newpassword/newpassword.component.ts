import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewpasswordComponent>) { }
  passwordForm: FormGroup;
  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl()
    });
  }
  passwordEnter(e) {
    if (this.passwordForm.valid) {
      if (e.key === 'Enter') {
        this.dialogRef.close(this.passwordForm.get('password').value);
      }
    }
  }
}
