import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Notice } from 'src/app/interfaces/notices';
import { Message } from 'src/app/interfaces/messages';
import { FormGroup, FormControl } from '@angular/forms';
import { Order } from 'src/app/interfaces/order';
import { CurrencyPipe } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // @ViewChild('lineChart') private chartRef;
  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router, private be: BackendServiceService, private cp: CurrencyPipe) {
    this.noticeRef = db.collection<Notice>('notices', ref => {
      return ref.orderBy('noticeDate', 'desc');
    });
    this.messageRef = db.collection<Message>('messages', ref => {
      return ref.orderBy('dateTime', 'desc');
    });
    this.orderRef = db.collection<Order>('orders', ref => {
      return ref.where('completed', '==', 0).orderBy('orderDateTime', 'asc');
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

  dashboardTotalSaleChartData: any;
  dashboardTotalSaleByDate: any[] = [];

  roleId = JSON.parse(localStorage.getItem('usrObj')).roleId;

  noticeRef: AngularFirestoreCollection<Notice>;
  notices: Observable<any[]>;

  messageRef: AngularFirestoreCollection<Message>;
  messages: Observable<any[]>;

  orders: Observable<any[]>;
  orderRef: AngularFirestoreCollection<Order>;

  messageForm: FormGroup;
  orderDiv = 'hidden';

  chartRev: any;
  chartFoodCat: any;

  statistic_rev: any;
  statistic_foodType: any;

  async ngOnInit() {
    this.messageForm = new FormGroup({
      userName: new FormControl(JSON.parse(localStorage.getItem('usrObj')).fullname),
      dateTime: new FormControl(new Date()),
      message: new FormControl(),
    });

    this.notices = this.noticeRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const notices = a.payload.doc.data() as Notice;
        // console.log(notices);
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

    this.orders = this.orderRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Order;
        data['id'] = a.payload.doc.id;
        // console.log('Order submitted!');
        this.reloadReport();
        return data;
      });
    }));

    let c = await this.loadAllDiaryReports();
    this.loadDiaryTransactionsAmount();
    let d = await this.loadDashboardData();
  }

  async loadChart() {
    // console.log(this.statistic_rev);
    const dateOrders = this.statistic_rev.map(res => res.dateOrder);
    const dataOrders = this.statistic_rev.map(res => res.total);
    const dataOrderCost = this.statistic_rev.map(res => res.cost);
    const dataOrderProfit = this.statistic_rev.map(res => res.profit);

    this.chartRev = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: dateOrders,
        datasets: [{
          label: 'ທຶນ',
          data: dataOrderCost,
          borderColor: '#943126',
          backgroundColor: '#FF5733',
          borderWidth: 1,
          // fill: true
        }, {
          label: 'ຍອດຂາຍ',
          data: dataOrders,
          borderColor: '#186A3B',
          backgroundColor: '#3cba9f',
          borderWidth: 1,
          // fill: true
        }, {
          label: 'ກຳໄລ',
          data: dataOrderProfit,
          borderColor: '#059D1A',
          backgroundColor: '#71D57F',
          borderWidth: 1,
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              // return this.cp.transform(Number(tooltipItem.yLabel), 'USD', true, '1.0-0');
              return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ກິບ';
            }
          }
        },
        legend: {
          display: true,
        },
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              minRotation: 90
            }
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

  async loadChartFoodCat() {
    const foodTypes = this.statistic_foodType.map(res => res.foodTypeName);
    const foodTypesData = this.statistic_foodType.map(res => res.total);

    this.chartFoodCat = new Chart('canvasFoodType', {
      type: 'pie',
      data: {
        labels: foodTypes,
        datasets: [{
          label: 'ຍອດຂາຍ',
          data: foodTypesData,
          borderColor: '#943126',
          backgroundColor: '#FF5733',
          borderWidth: 1,
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              // return this.cp.transform(Number(tooltipItem.yLabel), 'USD', true, '1.0-0');
              return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ກິບ';
            }
          }
        },
        legend: {
          display: false,
        },
        responsive: true,
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              minRotation: 90
            }
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
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
      rsp.subscribe(async (r) => {
        console.log(r);
        this.allReports = r;
        this.dashboardSummaryReports = r[0].summary_reports;
        this.dashboardKitchenReports = r[0].diary_kitchen_reports;
        this.dashboardPaymentReports = r[0].diary_payment_reports;
        this.dashboardUserReports = r[0].diary_user_reports;
        this.dashboardFoodsReports = r[0].diary_foods_reports;
        this.statistic_rev = r[0].statistic_revenue;
        this.statistic_foodType = r[0].statistic_foodType;
        await this.loadChart();
        await this.loadChartFoodCat();
      });
      // console.log(this.dashboardSummaryReports);
    });
  }
  async loadDashboardData() {
    this.be.getDashboardData().then(rsp => {
      rsp.subscribe(r => {
        this.dashboardTotalSaleByDate = [];
        this.dashboardTotalSaleChartData = r['total_sale'];
        this.dashboardTotalSaleByDate.forEach(_grandTotal => {
          this.dashboardTotalSaleByDate.push({
            orderDateTime: _grandTotal.orderDateTime,
            total: _grandTotal.grandtotal,
          });
          console.log(_grandTotal.orderDateTime);
        });
        // console.log(this.dashboardTotalSaleByDate);
      });
    });
  }
  addCommas(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }
}
