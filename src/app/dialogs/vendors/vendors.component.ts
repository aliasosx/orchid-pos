import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AngularFirestore, } from 'angularfire2/firestore';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<VendorsComponent>, private backendService: BackendServiceService, private snackbarRef: MatSnackBar) {

  }
  vendors: any;
  vendorForm: FormGroup;
  ngOnInit() {
    this.vendorForm = new FormGroup({
      'id': new FormControl(),
      'vendorCode': new FormControl(),
      'vendorName': new FormControl(),
      'contactId': new FormControl(),
      'address': new FormControl(),
      'enabled': new FormControl(),
      'userId': new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      'createdAt': new FormControl(),
      'updatedAt': new FormControl(),
    });
    this.loadStartUp();

  }
  loadStartUp() {
    this.backendService.getVendor().then((resp) => {
      resp.subscribe(rs => {
        this.vendors = rs;
      });
    });
  }
  enabledToggle(id, enabled) {
    const enabled_cat = !enabled;
    let enbr;
    if (enabled_cat === true) {
      enbr = 1;
    } else if (enabled_cat === false) {
      enbr = 0;
    }
    const vendor = {
      enabled: enbr,
      userId: this.vendorForm.get('userId').value
    };
    this.backendService.updateVendor(id, vendor).then((resp) => {
      resp.subscribe(rs => {
        if (rs['status'] === 'success') {
          this.snackbarRef.open('Update success', 'OK', { duration: 1000 });
          this.loadStartUp();
        }
      });
    });
  }
  deleteVendor(vendor) {

  }
}
