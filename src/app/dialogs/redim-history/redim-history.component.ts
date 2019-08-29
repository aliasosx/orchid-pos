import { Component, OnInit, Inject } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-redim-history',
  templateUrl: './redim-history.component.html',
  styleUrls: ['./redim-history.component.css']
})
export class RedimHistoryComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private dialogRef: MatDialogRef<RedimHistoryComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.getRewardHistories();
  }
  rewardHistories: any;

  ngOnInit() {
  }
  getRewardHistories() {
    this.backendService.getRewardUsedHistories(this.data).then(r => {
      r.subscribe(rewardHistories => {
        this.rewardHistories = rewardHistories;
      });
    });
  }

}
