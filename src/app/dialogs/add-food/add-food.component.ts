import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as uuid from 'uuid';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AngularFirestore, } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { AddSubFoodTranxComponent } from '../add-sub-food-tranx/add-sub-food-tranx.component';
declare var swal: any;

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private dialog: MatDialog, private dialogRef: MatDialogRef<AddFoodComponent>, private backendService: BackendServiceService) {

  }
  items: any[] = [];
  addFoodForm: FormGroup;
  showAlert = 'hidden';
  photoSrc = '../../../assets/images/icons/search.svg';
  saveDisabled = false;
  progressBarValue;

  foodtypes: any;
  kitchens: any;
  currencies: any;
  subfoods: any;
  foodTranxs: any[] = [];
  discs: any;

  ngOnInit() {
    const uuid1 = uuid.v1();

    this.addFoodForm = new FormGroup({
      id: new FormControl(),
      foodId: new FormControl(uuid1),
      food_name: new FormControl(),
      food_name_en: new FormControl(),
      food_photo: new FormControl(),
      foodTypeId: new FormControl(),
      cost: new FormControl(0),
      price: new FormControl(0),
      kitchenId: new FormControl(),
      discId: new FormControl(),
      currencyId: new FormControl(),
      updatedBy: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      isParent: new FormControl(),
      note: new FormControl(),
      subfoodId: new FormControl(),
      enabled: new FormControl(1),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
      subfoods: new FormControl(),
      deleted: new FormControl(0),
    });
    this.loadStartUp();
    this.loadDiscs();
  }
  async loadStartUp() {
    await this.backendService.getFoodTypes().then((resp_ft) => {
      resp_ft.subscribe(ft => {
        this.foodtypes = ft;
      });
    });
    await this.backendService.getKitchens().then((resp_ft) => {
      resp_ft.subscribe(ft => {
        this.kitchens = ft;
      });
    });
    await this.backendService.getCurrencies().then((resp_ft) => {
      resp_ft.subscribe(ft => {
        this.currencies = ft;
      });
    });

    await this.backendService.getSubfoods().then((resp_ft) => {
      resp_ft.subscribe(ft => {
        this.subfoods = ft;
      });
    });
  }

  async loadDiscs() {
    this.backendService.getDiscs().then(d => {
      d.subscribe(discs => {
        this.discs = discs;
      });
    });
  }

  uploadPhoto(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      const file = selectedFiles.item(0);
      const uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/foods/' + uniqkey, file);
      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.photoSrc = url;
        });
      });
    }
  }
  createFood() {
    if (this.addFoodForm.valid && this.items.length > 0) {
      this.addFoodForm.get('food_photo').setValue(this.photoSrc);
      this.addFoodForm.get('subfoods').setValue(this.items);
      this.saveDisabled = true;
      this.backendService.createFood(this.addFoodForm.value).then((res) => {
        res.subscribe(rs => {
          if (rs['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            swal('ລາຍການອາຫານນີ້ມີແລ້ວ ກະລຸນາເລືອກອາຫານໃໝ່', 'Food already exist!', 'error', { timer: 3000 });
            this.saveDisabled = false;
            return;
          }
        });
      });
    } else if (this.addFoodForm.valid) {
      this.addFoodForm.get('food_photo').setValue(this.photoSrc);
      this.saveDisabled = true;
      this.backendService.createFood(this.addFoodForm.value).then((res) => {
        res.subscribe(rs => {
          if (rs['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            swal('ລາຍການອາຫານນີ້ມີແລ້ວ ກະລຸນາເລືອກອາຫານໃໝ່', 'Food already exist!', 'error', { timer: 3000 });
            this.saveDisabled = false;
            return;
          }
        });
      });
    } else {
      this.saveDisabled = false;
      return;
    }
  }
  selectedType(e) {
    if (parseInt(e, 2) === 1) {
      const dialog = this.dialog.open(AddSubFoodTranxComponent, {
        width: '600px',
      });
      dialog.afterClosed().subscribe((a) => {
        this.items = a;
      });
    } else {
      return;
    }
  }
}
