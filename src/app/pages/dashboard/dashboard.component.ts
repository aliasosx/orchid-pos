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
  roleId = JSON.parse(localStorage.getItem('usrObj')).roleId;

  noticeRef: AngularFirestoreCollection<Notice>;
  notices: Observable<any[]>;

  messageRef: AngularFirestoreCollection<Message>;
  messages: Observable<any[]>;


  messageForm: FormGroup;

  ngOnInit() {

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
  sendMsg(event) {
    if (event.key === 'Enter') {
      console.log(this.messageForm.value);
      if (this.messageForm.get('message').value) {
        this.db.collection('messages').add(this.messageForm.value).then(() => {
          this.messageForm.get('message').reset();
          console.log('Message send');
        });
      }

    }
  }

}
