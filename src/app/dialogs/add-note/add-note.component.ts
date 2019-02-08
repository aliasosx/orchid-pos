import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddNoteComponent>) { }
  addNoteForm: FormGroup;

  ngOnInit() {
    this.addNoteForm = new FormGroup({
      note: new FormControl()
    });
  }

  addNote() {
    if (this.addNoteForm.valid) {
      this.dialogRef.close(this.addNoteForm.value);
    }
  }
}
