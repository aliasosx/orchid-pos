import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-disc-selection',
  templateUrl: './disc-selection.component.html',
  styleUrls: ['./disc-selection.component.css']
})
export class DiscSelectionComponent implements OnInit {

  constructor(private backendServices: BackendServiceService) {
    this.loadDiscs();
  }
  discs: any;
  ngOnInit() {
  }
  loadDiscs() {
    this.backendServices.getDiscs().then(r => {
      r.subscribe(discs => {
        this.discs = discs;
      });
    });
  }
}
