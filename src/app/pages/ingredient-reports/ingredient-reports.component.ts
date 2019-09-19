import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BomService } from 'src/app/services/bom.service';

@Component({
  selector: 'app-ingredient-reports',
  templateUrl: './ingredient-reports.component.html',
  styleUrls: ['./ingredient-reports.component.css']
})
export class IngredientReportsComponent implements OnInit {

  constructor(private bom: BomService) { }
  stockForm: FormGroup;
  reports: any;

  ngOnInit() {
    this.stockForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });
  }
  loadReportByRange() {
    this.bom.getIngredientReportsByOrders(this.stockForm.value).then(r => {
      r.subscribe(reports => this.reports = reports);
    });
  }
}
