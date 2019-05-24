import { MatDialogRef, MatSnackBar } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var swal: any;

@Component({
  selector: 'app-create-expenditure',
  templateUrl: './create-expenditure.component.html',
  styleUrls: ['./create-expenditure.component.css']
})
export class CreateExpenditureComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private dialogRef: MatDialogRef<CreateExpenditureComponent>, private snackbar: MatSnackBar) { }
  refno = this.padding(Math.floor(Math.random() * 10000000000) + 1, 12);
  expenditureForm: FormGroup;
  expenditureTypes: any;
  expenditureSrcs: any;
  units: any;
  terminals: any;

  kitchens: any;

  cashloadsId;
  balance;
  currentCashInDrawer = 0;

  btnDisabled = false;

  async ngOnInit() {
    this.expenditureForm = new FormGroup({
      id: new FormControl(),
      refno: new FormControl(this.refno),
      expenditureTypeId: new FormControl(),
      expenditureSrcId: new FormControl(),
      quantity: new FormControl(0),
      price: new FormControl(0),
      amount: new FormControl(0),
      paymentDate: new FormControl(new Date()),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      unitId: new FormControl(),
      cashId: new FormControl(),
      isApproved: new FormControl(0),
      approvedBy: new FormControl(),
      cashloadId: new FormControl(),
      remarks: new FormControl(),
      kitchenId: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });

    await this.loadExpenditureTypes();
    await this.loadUnit();
    await this.loadExpenditureSrcs();
    await this.loadTerminals();
    await this.loadKitchens();
  }

  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
  async loadExpenditureTypes() {
    this.backendService.getExpenditureTypes().then(rsp => {
      rsp.subscribe(expenditureTypes => {
        this.expenditureTypes = expenditureTypes;
      });
    });
  }
  async loadUnit() {
    this.backendService.getUnit().then(rsp => {
      rsp.subscribe(units => {
        this.units = units;
      });
    });
  }
  async loadExpenditureSrcs() {
    this.backendService.getExpenditureSrc().then(rsp => {
      rsp.subscribe(expenditureSrcs => {
        this.expenditureSrcs = expenditureSrcs;
      });
    });
  }
  totalCaculation() {
    // tslint:disable-next-line: max-line-length
    this.expenditureForm.get('amount').setValue(parseInt(this.expenditureForm.get('quantity').value, 10) * parseInt(this.expenditureForm.get('price').value, 10));
  }
  createExpenditure() {
    if (this.expenditureForm.valid) {
      console.log(this.expenditureForm.value);
      this.backendService.createExpenditureTranx(this.expenditureForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            this.snackbar.open('Something went wrong', 'OK', { duration: 1000 });
          }
        });
      });
    } else {
      this.snackbar.open('Data incomplete', 'OK', { duration: 1000 });
    }
  }
  loadTerminals() {
    this.backendService.getTerminalsForExps().then(t => {
      t.subscribe(terminals => {
        this.terminals = terminals;
      });
    });
  }
  loadCurrentCashByTerminal(event) {
    this.backendService.getCashAmountTotalByTerminal(event).then(rsp => {
      rsp.subscribe(terminalAmount => {
        console.log(terminalAmount);
        if (terminalAmount['status'] === 'error') {
          swal({
            title: 'ລີ້ນຊັກຍັງບໍ່ໄດ້ເປີດຂາຍ',
            text: 'Drawer inactive' + this.currentCashInDrawer,
            icon: 'error'
          });
        } else {
          this.currentCashInDrawer = terminalAmount['CASH_STOCK'];
          this.cashloadsId = terminalAmount['cashId'];
          this.expenditureForm.get('cashloadId').setValue(this.cashloadsId);
          if (parseInt(this.expenditureForm.get('amount').value, 10) > this.currentCashInDrawer) {
            swal({
              title: 'ເງິນໃນລີ້ນຊັກບໍ່ພໍ',
              text: 'ເງິນໃນລິ້ນຊັກມີທັງໝົດ ' + this.currentCashInDrawer,
              icon: 'error'
            });
            this.btnDisabled = true;
          } else {
            this.btnDisabled = false;
          }
        }

      });
    });
  }
  async loadKitchens() {
    this.backendService.getKitchens().then(rsp => {
      rsp.subscribe(kitchens => {
        this.kitchens = kitchens;
      });
    });
  }
}
