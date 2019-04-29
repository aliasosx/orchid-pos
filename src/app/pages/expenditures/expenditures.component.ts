import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.css']
})
export class ExpendituresComponent implements OnInit {

  constructor(private backendServer: BackendServiceService) { }

  expenditureTypes: any;
  expenditureForm: FormGroup;
  selectedCate: any;

  ngOnInit() {
    this.expenditureForm = new FormGroup({
      id: new FormControl(),
      expenditureTypeId: new FormControl(),
      expenditureSrcId: new FormControl(),
      amount: new FormControl(),
      paymentDate: new FormControl(new Date()),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      approvedBy: new FormControl(),
      remarks: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl(new Date()),
    });
    this.loadExpType();
  }
  loadExpType() {
    this.backendServer.getExpenditureTypes().then(rsp => {
      rsp.subscribe(ExpenditureTypes => {
        this.expenditureTypes = ExpenditureTypes;
      });
    });
  }
  openAddExp() {

  }

}
