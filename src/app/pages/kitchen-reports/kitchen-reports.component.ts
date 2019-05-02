import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen-reports',
  templateUrl: './kitchen-reports.component.html',
  styleUrls: ['./kitchen-reports.component.css']
})
export class KitchenReportsComponent implements OnInit {

  constructor(private backendService: BackendServiceService) { }

  kitchens: any;

  async ngOnInit() {
    await this.loadKitchens();
  }
  async loadKitchens() {
    this.backendService.getKitchens().then(rsp => {
      rsp.subscribe(kitchens => {
        this.kitchens = kitchens;
      });
    });
  }
  loadReport() {

  }
}
