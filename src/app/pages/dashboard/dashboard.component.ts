import { Kitchen } from './../../interfaces/kitchen';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from './../../interfaces/transaction';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Food } from 'src/app/interfaces/food';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router, private be: BackendServiceService) {
  }

  private user: Observable<firebase.User>;
  username_info: any;

  username;
  currentDate: Date = new Date();
  summaryReports: any;
  summaryReportsKitchens: any;
  summaryReportsPayments: any;
  summaryReportsUsers: any;

  ngOnInit() {
    this.loadDiaryTransactionsAmount();
  }
  reloadReport() {
    this.loadDiaryPaymentTypeAmount();
  }
  loadDiaryTransactionsAmount() {
    this.be.getSummaryDiaryReport().then(rsp => {
      rsp.subscribe(r => {
        this.summaryReports = r;
      });
    });
    this.loadDiaryTransactionsKitchenAmount();
  }
  loadDiaryTransactionsKitchenAmount() {
    this.be.getSummaryKitchenReport().then(rsp => {
      rsp.subscribe(r => {
        this.summaryReportsKitchens = r;
      });
    });
    this.loadDiaryPaymentTypeAmount();
  }
  loadDiaryPaymentTypeAmount() {
    this.be.getSummaryPaymentTypeReport().then(rsp => {
      rsp.subscribe(r => {
        this.summaryReportsPayments = r;
      });
    });
    this.loadDiaryUsersAmount();
  }
  loadDiaryUsersAmount() {
    this.be.getSummaryUsersReport().then(rsp => {
      rsp.subscribe(r => {
        this.summaryReportsUsers = r;
      });
    });
  }

}
