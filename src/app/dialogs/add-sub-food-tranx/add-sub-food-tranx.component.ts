import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-sub-food-tranx',
  templateUrl: './add-sub-food-tranx.component.html',
  styleUrls: ['./add-sub-food-tranx.component.css']
})
export class AddSubFoodTranxComponent implements OnInit {

  constructor(private bsrv: BackendServiceService, private dialogRef: MatDialogRef<AddSubFoodTranxComponent>) { }
  subFoodForm: FormGroup;
  subFoods: any;
  items: any[] = [];
  foodName: string;
  ngOnInit() {
    this.subFoodForm = new FormGroup({
      id: new FormControl(),
      subFoodId: new FormControl(),
      cost: new FormControl(0),
      price: new FormControl(0),
    });
    this.loadStartUp();

  }
  loadStartUp() {
    this.bsrv.getSubfoods().then((resp) => {
      resp.subscribe(rs => {
        this.subFoods = rs;
      });
    });
  }
  addToItem() {
    this.items.push({
      id: this.subFoodForm.get('subFoodId').value,
      foodName: this.foodName,
      cost: this.subFoodForm.get('cost').value,
      price: this.subFoodForm.get('price').value,
    });
  }
  selectedFood(e) {
    this.foodName = e.target.options[e.target.options.selectedIndex].text;
  }
  saveFood() {
    if (this.subFoodForm.valid && this.items.length > 0) {
      this.dialogRef.close(this.items);
    }
  }

}
