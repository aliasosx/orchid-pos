import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-reward-redim',
  templateUrl: './reward-redim.component.html',
  styleUrls: ['./reward-redim.component.css']
})
export class RewardRedimComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private memberService: MembersService, private dialogRef: MatDialogRef<RewardRedimComponent>, @Inject(MAT_DIALOG_DATA) public rewards) { }
  selectedRewards: any;
  rewardDeatils: any;
  showFood = false;
  foods: any;

  ngOnInit() {
  }
  getRewardDetail() {
    if (this.selectedRewards === null) { return; }
    this.memberService.getRewardById(this.selectedRewards).then(r => {
      r.subscribe(rewards => {
        this.rewardDeatils = rewards;
        console.log(rewards);
        if (this.rewardDeatils[0].rewardTypeId === 1) {
          this.showFood = true;
          // tslint:disable-next-line: max-line-length
          this.memberService.getRewardFoodByFoodTypeId(this.rewardDeatils[0].foodCategoryId, this.rewardDeatils[0].priceCritiria).then(rs => {
            rs.subscribe(foods => {
              this.foods = foods;
            });
          });

        }
      });
    });
  }
  saveRewards() {

  }
}
