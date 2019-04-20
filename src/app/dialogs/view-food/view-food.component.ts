
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<ViewFoodComponent>, private storage: AngularFireStorage, private be: BackendServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  addFoodForm: FormGroup;
  progressBarValue;
  photoSrc = '../../../assets/images/icons/search.svg';

  foodTypes: any;
  currencies: Observable<any>;
  kitchens: any;
  saveDisabled = false;
  discs: any;
  priceCostDisable = false;
  masterFood = false;

  ngOnInit() {
    this.addFoodForm = new FormGroup({
      id: new FormControl(),
      food_name: new FormControl(),
      food_name_en: new FormControl(),
      food_photo: new FormControl(),
      foodTypeId: new FormControl(),
      isParent: new FormControl({ disable: true }),
      discId: new FormControl(),
      price: new FormControl(),
      cost: new FormControl(),
      kitchenId: new FormControl(),
      updatedBy: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      enabled: new FormControl(true),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
      note: new FormControl(),
    });
    // Load startup

    // console.log(this.data);

    if (this.data.pFood) {
      this.masterFood = true;
      this.priceCostDisable = true;
    } else {
      this.masterFood = false;
      this.priceCostDisable = false;
    }
    this.loadStartUp();

  }

  async loadStartUp() {
    let d = await this.loadFoodById();
    let e = await this.loadFoodType();
    let f = await this.loadKitchens();
    let g = await this.loadDiscs();
  }
  async loadFoodById() {

    if (this.masterFood === false) {
      let c = await this.be.getFoodsById(this.data.fid).then(fd => {
        fd.subscribe(async (food) => {
          // console.log(food);
          food['cost'] = 0;
          food['price'] = 0;
          let m = await this.addFoodForm.setValue(food);
          this.photoSrc = await food['food_photo'];
          let c = await this.loadFoodTranx(this.data.fid);
        });
      });
    } else if (this.masterFood === true) {
      let c = await this.be.getFoodsById(this.data.pFood.fid).then(fd => {
        fd.subscribe(async (food) => {
          console.log(food);
          food['cost'] = 0;
          food['price'] = 0;
          let m = await this.addFoodForm.setValue(food);
          this.photoSrc = await food['food_photo'];
          let c = await this.loadFoodTranx(this.data.pFood.fid);
        });
      });
    }

  }

  async loadDiscs() {
    this.be.getDiscs().then(d => {
      d.subscribe(discs => {
        this.discs = discs;
      });
    });
  }

  async loadFoodTranx(id) {
    if (this.data.isParent === 0) {
      this.be.getFoodTranxByFoodId(id).subscribe(async (subfoods) => {
        this.addFoodForm.get('cost').setValue(subfoods[0].cost);
        this.addFoodForm.get('price').setValue(subfoods[0].price);
      });
    } else {
      return;
    }
  }
  async loadFoodType() {
    let c = await this.be.getFoodTypes().then(resp => {
      resp.subscribe(foodtypes => {
        this.foodTypes = foodtypes;
      });
    });
  }
  async loadCurrency() {
    this.currencies = await this.be.getCurrencies();
  }
  async loadKitchens() {
    let c = await this.be.getKitchens().then((ks) => {
      ks.subscribe(ksc => {
        this.kitchens = ksc;
      });
    });
  }

  uploadPhoto(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      let file = selectedFiles.item(0);
      let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/foods/' + uniqkey, file);
      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.photoSrc = url; // Image url
          // console.log(url);
        });
      });
    }
  }

  updateFood() {
    this.saveDisabled = true;
    if (this.addFoodForm.valid) {
      this.addFoodForm.get('food_photo').setValue(this.photoSrc);
      this.be.updateFood(this.addFoodForm.get('id').value, this.addFoodForm.value).then((resp) => {
        resp.subscribe(rs => {
          if (rs['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            alert('Error happend');
          }
        });
      });

    } else {
      this.saveDisabled = false;
      return;
    }
  }
}
