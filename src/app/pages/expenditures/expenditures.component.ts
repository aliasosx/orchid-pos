import { ApprovedUsersComponent } from './../../dialogs/approved-users/approved-users.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { CreateExpenditureComponent } from 'src/app/dialogs/create-expenditure/create-expenditure.component';
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

  ngOnInit() {
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

}
