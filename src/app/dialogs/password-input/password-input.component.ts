import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PasswordInputComponent>) { }
  passwordInputPassing: FormGroup;
  ngOnInit() {
    this.passwordInputPassing = new FormGroup({
      passwordInput: new FormControl()
    });
  }
  passwordProcess() {
    if (this.passwordInputPassing.valid) {
      this.dialogRef.close(this.passwordInputPassing.get('passwordInput').value.trim());
    } else {
      return;
    }
  }


}
