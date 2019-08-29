import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-redim',
  templateUrl: './member-redim.component.html',
  styleUrls: ['./member-redim.component.css']
})
export class MemberRedimComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private dialogRef: MatDialogRef<MemberRedimComponent>, @Inject(MAT_DIALOG_DATA) public data, private dp: DatePipe) {
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
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      uniqueKeyRedim: new FormControl(),
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
            this.rewardTrans.get('remarks').setValue('Reward redim from ' + reward[0].rewardDescriptions);
            // tslint:disable-next-line: max-line-length
            this.rewardTrans.get('uniqueKeyRedim').setValue(reward[0].id.toString() + this.data.mId.toString() + this.dp.transform(new Date(), 'ddMMyyyy'));
            this.btnSaveDisable = false;
          } else {
            this.btnSaveDisable = true;
          }
        });
      });
    }
  }
  saveRedim() {
    // console.log(this.rewardTrans.value);
    if (this.rewardTrans.valid) {
      this.backendService.createRewardTranx(this.rewardTrans.value).then(r => {
        r.subscribe(rsp => {
          // console.log(rsp['status']);
          if (rsp['status'] === 'success') {
            this.dialogRef.close('success');
          } else if (rsp['status'] === 'error') {
            // console.log(this.rewardTrans.value);
            Swal.fire('ທ່ານບໍ່ສາມາດແລກໄດ້ເກີນ 1 ຄັ້ງຕໍ່ວັນ', 'ກະລຸນາເລືອກ ແລກຄະແນນໃໝ່', 'error');
            return;
          }
        });
      });
    }
  }
  closeDialog() {
    this.dialogRef.close('cancel');
  }
}
