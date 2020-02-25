import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { BackendServiceService } from '../../services/common/backend-service.service';

@Component({
  selector: 'app-report-details-by-food-group',
  templateUrl: './report-details-by-food-group.component.html',
  styleUrls: ['./report-details-by-food-group.component.css']
})
export class ReportDetailsByFoodGroupComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private dialogRef: MatDialogRef<ReportDetailsByFoodGroupComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  reports: any;
  ngOnInit() {
    console.log(this.data);
    this.genReport();
  }
  genReport() {
    this.backendService.getReportByFoodTypeByDate({
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      foodTypeId: this.data.foodTypeId
    }).then(rsp => {
      rsp.subscribe(rpt => {
        this.reports = rpt;
        console.log(this.reports);
      });
    });
  }
}
