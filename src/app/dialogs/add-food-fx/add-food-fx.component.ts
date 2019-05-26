import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FoodFxServiceService } from 'src/app/services/food-fx-service.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-food-fx',
  templateUrl: './add-food-fx.component.html',
  styleUrls: ['./add-food-fx.component.css']
})
export class AddFoodFxComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private _foodFxService: FoodFxServiceService, private dialogRef: MatDialogRef<AddFoodFxComponent>, private snackbar: MatSnackBar) { }
  addFoodFxForm: FormGroup;
  ngOnInit() {
    this.addFoodFxForm = new FormGroup({
      id: new FormControl(),
      foodFxName: new FormControl(),
      remarks: new FormControl(),
      cost: new FormControl(0),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      enabled: new FormControl(1),
    });
  }
  addNewFoodFx() {
    if (this.addFoodFxForm.valid) {
      console.log(this.addFoodFxForm.value);
      this._foodFxService.createFoodFx(this.addFoodFxForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            this.snackbar.open('Something when wrong!!!', 'Error', { duration: 3000 });
            return;
          }
        });
      });
    }
  }

}
