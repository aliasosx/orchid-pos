import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private memberService: MembersService, private dialogRef: MatDialogRef<MembersComponent>) {
    this.loadMembers();
  }
  cards: any;
  phone: any;
  members: any;

  ngOnInit() {
  }
  loadMembers() {
    this.memberService.getMembers().then(r => {
      r.subscribe(members => {
        console.log(members);
        this.members = members;
      });
    });
  }
  selectMember(member) {
    this.dialogRef.close(member);
  }
}
