import { AddNewMemberComponent } from './../../dialogs/add-new-member/add-new-member.component';
import { ViewMemberComponent } from './../view-member/view-member.component';
import { MatDialog } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memberlists',
  templateUrl: './memberlists.component.html',
  styleUrls: ['./memberlists.component.css']
})
export class MemberlistsComponent implements OnInit {

  constructor(private backendServices: BackendServiceService, private dialog: MatDialog) {
    this.getMemberShow();
  }
  members: any;
  memberCardNo: any;
  phone: any;
  btnRewardDisabled = true;
  topTransactionByIds: any;

  ngOnInit() {
  }
  getMemberShow() {
    this.backendServices.getMemberShow().then(r => {
      r.subscribe(members => {
        // console.log(members);
        this.members = members;
      });
    });
  }
  viewMemberInfo(memberId, cardNo) {
    if (!memberId) { return; }
    const dialogRef = this.dialog.open(ViewMemberComponent, {
      width: '600px',
      data: {
        memberId,
        cardNo
      },
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp === 'success') {
        this.getMemberShow();
      }
    });
  }
  viewTopTenTransactions(member) {

  }
  toggleActive(member) {

  }
  closeCardDialog(id) {

  }
  openRewardUse(member) {

  }
  openAddNewMember() {
    const dialogRef = this.dialog.open(AddNewMemberComponent, {
      width: '600px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(member => {
      this.getMemberShow();
    });
  }
}
