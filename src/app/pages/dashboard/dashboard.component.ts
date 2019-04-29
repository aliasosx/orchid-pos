import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Notice } from 'src/app/interfaces/notices';
import { Message } from 'src/app/interfaces/messages';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router, private be: BackendServiceService) {
    this.noticeRef = db.collection<Notice>('notices', ref => {
      return ref.orderBy('noticeDate', 'desc');
    });
    this.messageRef = db.collection<Message>('messages', ref => {
      return ref.orderBy('dateTime', 'desc');
    });
  }

  private user: Observable<firebase.User>;
  username_info: any;

  username;
  currentDate: Date = new Date();
  summaryReports: any;
  summaryReportsKitchens: any;
  summaryReportsPayments: any;
  summaryReportsUsers: any;

  summaryReports_letterp: any;
  summaryReports_kitchen_letterp: any;
  summaryReports_staff_letterp: any;
  summaryReports_Foods_letterp: any;

  allReports: any;

  dashboardSummaryReports: any;
  dashboardKitchenReports: any;
  dashboardPaymentReports: any;
  dashboardUserReports: any;
  dashboardFoodsReports: any;
  dashboardInQReports: any;


  roleId = JSON.parse(localStorage.getItem('usrObj')).roleId;

  noticeRef: AngularFirestoreCollection<Notice>;
  notices: Observable<any[]>;

  messageRef: AngularFirestoreCollection<Message>;
  messages: Observable<any[]>;


  messageForm: FormGroup;

  async ngOnInit() {

    this.messageForm = new FormGroup({
      userName: new FormControl(JSON.parse(localStorage.getItem('usrObj')).fullname),
      dateTime: new FormControl(new Date()),
      message: new FormControl(),
    });

    this.notices = this.noticeRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const notices = a.payload.doc.data() as Notice;
        notices['id'] = a.payload.doc.id;
        return notices;
      });
    }));

    this.messages = this.messageRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const messages = a.payload.doc.data() as Message;
        messages['id'] = a.payload.doc.id;
        return messages;
      });
    }));
    let c = await this.loadAllDiaryReports();
    this.loadDiaryTransactionsAmount();

  }
  reloadReport() {
    this.loadAllDiaryReports();
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
    this.loadOldReportSummary();
  }
  sendMsg(event) {
    if (event.key === 'Enter') {
      // console.log(this.messageForm.value);
      if (this.messageForm.get('message').value) {
        this.db.collection('messages').add(this.messageForm.value).then(() => {
          this.messageForm.get('message').reset();
          // console.log('Message send');
        });
      }
    }
  }
  loadOldReportSummary() {
    this.be.getOldSummaryReport().then(rsp => {
      rsp.subscribe(r => {
        this.summaryReports_letterp = r[0].summaryReports;
        this.summaryReports_kitchen_letterp = r[0].summaryReportsKitchen;
        this.summaryReports_staff_letterp = r[0].summaryReportsStaff;
        this.summaryReports_Foods_letterp = r[0].summaryReportsFoods;
        this.dashboardInQReports = r[0].inqReport;
      });
    });
  }
  async loadAllDiaryReports() {
    this.be.getAllDashboardReports().then(rsp => {
      rsp.subscribe(r => {
        // console.log(r);
        this.allReports = r;
        this.dashboardSummaryReports = r[0].summary_reports;
        this.dashboardKitchenReports = r[0].diary_kitchen_reports;
        this.dashboardPaymentReports = r[0].diary_payment_reports;
        this.dashboardUserReports = r[0].diary_user_reports;
        this.dashboardFoodsReports = r[0].diary_foods_reports;
      });
      // console.log(this.dashboardSummaryReports);
    });
  }
}
