import { ApprovedUsersComponent } from './../../dialogs/approved-users/approved-users.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { CreateExpenditureComponent } from 'src/app/dialogs/create-expenditure/create-expenditure.component';
import { FormGroup, FormControl } from '@angular/forms';
declare var swal: any;
@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.css']
})
export class ExpendituresComponent implements OnInit {

  constructor(private backendServer: BackendServiceService, private dialog: MatDialog) { }

  expenditureTypes: any;

  selectedCate: any;
  expenditures: any;
  currentAmountTerminal = 0;
  dateForm: FormGroup;
  expenditureReportByRemarks: any;
  expenditureReportsSrc: any;
  expenditureReportsUser: any;
  totalExpRemark = 0;

  ngOnInit() {

    this.dateForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });

    this.loadExpType();
    this.loadExpenditureDisplay();
  }
  loadExpType() {
    this.backendServer.getExpenditureTypes().then(rsp => {
      rsp.subscribe(ExpenditureTypes => {
        this.expenditureTypes = ExpenditureTypes;
      });
    });
  }
  loadExpenditureDisplay() {
    this.backendServer.getExpenditureDisplay().then(rsp => {
      rsp.subscribe(expenditures => {
        this.expenditures = expenditures;
      });
    });
  }
  openAddExp() {
    const dialogRef = this.dialog.open(CreateExpenditureComponent, { width: '600px' });
    dialogRef.afterClosed().subscribe(r => {
      if (r === 'success') {
        this.loadExpenditureDisplay();
      }
    });
  }
  openApproveUser(exp) {
    swal({
      title: 'ແນ່ໃຈວ່າຈະ ອະນຸມັດປິດລາຍການນີ້',
      icon: 'warning',
      dangerMode: true,
    }).then((value) => {
      if (value) {
        const dialogRef = this.dialog.open(ApprovedUsersComponent, {
          width: '600px',
          data: 'none',
        });
        dialogRef.afterClosed().subscribe(resp => {
          if (resp.user) {
            // after approve
            const updateTranx = {
              isApproved: 1,
              approvedBy: resp.user.username
            };
            this.backendServer.updateExpenditureTranx(exp.txId, updateTranx).then(rsp => {
              rsp.subscribe(r => {
                if (r['status'] === 'success') {
                  this.loadExpenditureDisplay();
                }
              });
            });
          }
        });
      }
    });
  }
  deleteItem(id) {
    swal({
      title: 'ແນ່ໃຈວ່າຈະ ວ່າຈະລຶບລາຍການນີ້',
      icon: 'warning',
      dangerMode: true,
    }).then((value) => {
      if (value) {
        this.backendServer.deleteExpenditureTranx(id).then(rsp => {
          rsp.subscribe(r => {
            if (r['status'] === 'success') {
              this.loadExpenditureDisplay();
            } else if (r['status'] === 'error') {
              swal({
                title: 'ບໍ່ສາມາດລຶບລາຍການທີ່ອະນຸມັດແລ້ວ',
                icon: 'error',
              });
            }
          });
        });
      }
    });
  }
  loadReport() {
    const report_params = {
      startDate: new Date(this.dateForm.get('startDate').value),
      endDate: new Date(this.dateForm.get('endDate').value),
    }
    this.backendServer.getExpenditureReport(report_params).then(r => {
      r.subscribe(reports => {
        // console.log(reports);
        this.expenditureReportByRemarks = reports['ExpenditureReportsByRemark'];
        this.expenditureReportsSrc = reports['ExpenditureReportsSrc'];
        this.expenditureReportsUser = reports['ExpenditureReportsUser'];
        this.expenditureReportByRemarks.forEach(element => {
          this.totalExpRemark += element.total_amount;
        });
      });
    });
  }
}
