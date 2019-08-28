import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-member-redim',
  templateUrl: './member-redim.component.html',
  styleUrls: ['./member-redim.component.css']
})
export class MemberRedimComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private dialogRef: MatDialogRef<MemberRedimComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.getRewards();
  }
  rewardTrans: FormGroup;
  showRedimForm = '';
  rewards: any;
  currentPoints = 0;
  remainigPoint = 0;
  btnSaveDisable = true;
  pointUsed = 0;
  ngOnInit() {
    this.rewardTrans = new FormGroup({
      rewardId: new FormControl(),
      memberId: new FormControl(this.data.mId),
      points: new FormControl(this.data.points),
      used: new FormControl(),
      remarks: new FormControl('Reward redim module'),
    });
  }
  getRewards() {
    this.backendService.getRewards().then(r => {
      r.subscribe(rewards => {
        this.rewards = rewards;
      });
    });
  }
  selectedReward(e) {
    if (e) {
      this.backendService.getRewardById(e).then(r => {
        r.subscribe(reward => {
          this.remainigPoint = this.data.points - reward[0].points;
          if (this.remainigPoint > 0) {
            this.rewardTrans.get('used').setValue(reward[0].points);
            this.btnSaveDisable = false;
          } else {
            this.btnSaveDisable = true;
          }
        });
      });
    }
  }
  saveRedim() {
    console.log(this.rewardTrans.value);
    if (this.rewardTrans.valid) {
      this.backendService.createRewardTranx(this.rewardTrans.value).then(r => {
        r.subscribe(rsp => {
          if (rsp['status'] = 'success') {
            this.dialogRef.close('success');
          } else {
            console.log(this.rewardTrans.value);
            return;
          }
        });
      });
    }
  }
}
