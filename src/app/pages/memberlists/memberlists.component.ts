import { AddNewMemberComponent } from './../../dialogs/add-new-member/add-new-member.component';
import { ViewMemberComponent } from './../view-member/view-member.component';
import { MatDialog } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { MemberRedimComponent } from 'src/app/dialogs/member-redim/member-redim.component';
import { RedimHistoryComponent } from 'src/app/dialogs/redim-history/redim-history.component';

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
    // console.log(member);
    let _enabled;
    if (member.enabled === 1) {
      _enabled = 0;
    } else if (member.enabled === 0) {
      _enabled = 1;
    }

    let json_active = {
      enabled: _enabled
    };
    this.backendServices.updateMember(member.mId, json_active).then(r => {
      r.subscribe(members => {
        if (members['status'] !== 'error') {
          this.getMemberShow();
        }
      });
    });
  }
  closeCardDialog(id) {

  }
  openRewardUse(member) {
    const dialogRef = this.dialog.open(MemberRedimComponent, {
      width: '400px',
      data: member
    });
    dialogRef.afterClosed().subscribe(r => {
      this.getMemberShow();
    });
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
  openRedimHistory(member) {
    if (member.points === 0) { return; }
    const dialogRef = this.dialog.open(RedimHistoryComponent, {
      width: '1024px',
      data: member.mId,
    });
    dialogRef.afterClosed().subscribe(r => {
      this.getMemberShow();
    });
  }

}
