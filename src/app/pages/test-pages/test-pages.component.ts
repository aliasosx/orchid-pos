import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-pages',
  templateUrl: './test-pages.component.html',
  styleUrls: ['./test-pages.component.css']
})
export class TestPagesComponent implements OnInit {

  constructor(private be: BackendServiceService) { }

  ngOnInit() {
  }
  testCommand() {
    this.be.getBanks().then(rsp => {
      rsp.subscribe(r => {
        // console.log(r);
      });
    });
  }

}
