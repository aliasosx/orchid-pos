import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private memberService: MembersService) {
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

}
