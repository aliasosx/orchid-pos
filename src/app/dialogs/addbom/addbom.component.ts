import { MatDialogRef, MatSnackBar } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BomService } from 'src/app/services/bom.service';

@Component({
  selector: 'app-addbom',
  templateUrl: './addbom.component.html',
  styleUrls: ['./addbom.component.css']
})
export class AddbomComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private be: BackendServiceService, private bomService: BomService, private dialogRef: MatDialogRef<AddbomComponent>, private snackBar: MatSnackBar) {

  }

  productCode: string;
  foodId: string;
  products: any;
  foods: any;
  addBomForm: FormGroup;

  title: string;
  saveButtonTitle: string;
  async ngOnInit() {
    this.addBomForm = new FormGroup({
      bomName: new FormControl(),
      note: new FormControl(),
      enabled: new FormControl(1),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });
  }
  createBom() {
    if (this.addBomForm.valid) {
      this.bomService.createBom(this.addBomForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            this.snackBar.open('Form incomplete!', 'OK', { duration: 1000 });
            return;
          }
        });
      });
    } else {
      this.snackBar.open('Form incomplete!', 'OK', { duration: 1000 });
      return;
    }
  }
}
