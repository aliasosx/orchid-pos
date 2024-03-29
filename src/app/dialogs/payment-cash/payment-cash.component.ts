import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { QrBankResponseData } from 'src/app/interfaces/qrBankResponseData';
import { Ticket } from 'src/app/interfaces/ticket';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MembersService } from 'src/app/services/members.service';
import * as uuid from 'uuid';

import { environment } from '../../../environments/environment';
import { MembersComponent } from '../members/members.component';
import { PrinterServiceService } from './../../services/printer-service.service';

declare var $: any;
declare var deepstream: any;

declare var swal: any;

@Component({
  selector: 'app-payment-cash',
  templateUrl: './payment-cash.component.html',
  styleUrls: ['./payment-cash.component.css']
})
export class PaymentCashComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<PaymentCashComponent>, private snackbar: MatSnackBar, public sanitizer: DomSanitizer, private backendServices: BackendServiceService, @Inject(MAT_DIALOG_DATA) public data, private printerService: PrinterServiceService, private backendService: BackendServiceService, private dialog: MatDialog, private memberService: MembersService) {
    this.username = data.username;
    this.ticketsRef = db.collection<Ticket>('tickets', ref => {
      return ref.where('used', '==', false).orderBy('ticket', 'asc');
    });
    this.paymentTypesRef = db.collection<PaymentType>('paymentTypes', ref => {
      return ref.where('enabled', '==', true).orderBy('paymentCode', 'asc');
    });
    this.qrPaymentsRef = db.collection<QrBankResponseData>('qrPayments');

    const uuid1 = uuid.v4();
    const refno = this.padding(Math.floor(Math.random() * 60000000000) + 1, 12);
    this.orderForm = new FormGroup({
      orderId: new FormControl(uuid1),
      refno: new FormControl(refno),
      ticket: new FormControl(),
      qrRefno: new FormControl(),
      food: new FormControl(),
      grandtotal: new FormControl(this.data.total),
      recieved: new FormControl(this.data.total),
      change: new FormControl(0),
      paymentType: new FormControl('CASH'),
      invoiceno: new FormControl(),
      orderDateTime: new FormControl(new Date()),
      orderFinishTime: new FormControl(),
      settled: new FormControl(0),
      completed: new FormControl(0),
      username: new FormControl(this.username),
      status: new FormControl('processing'),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      cashloadId: new FormControl(),
      memberId: new FormControl(),
      memberName: new FormControl(),
      deriveryId: new FormControl(1),
      deriveryDescription: new FormControl(),
    });
    this.member = this.data.member;

    this.orderForm.get('memberId').setValue(this.data.member.memberId);
    this.orderForm.get('deriveryDescription').setValue(this.deriveryDescription);
    this.showMember = '';
    this.getExchangeRate();
  }
  username: string;
  members: any;
  paymentBtnDisabled = false;
  member: any;
  showMember = 'hidden';
  customerResponseDate = '';
  exchangeRates: any;
  orderForm: FormGroup;
  ticketsRef: AngularFirestoreCollection<Ticket>;
  tickets: Observable<any[]>;
  ticketSelected: number;
  foodList: any = [];
  deriveries: any;
  deriveryDescription = 'inplace';
  paymentTypesRef: AngularFirestoreCollection<PaymentType>;
  paymentTypes: Observable<any[]>;
  showPaymentCash = 'hidden';

  qRCodeUrl = environment.qrcodeUrl.url;
  srcQr = '../../../assets/icons/qr-code.svg';
  ticketSelectedId: Ticket;
  cartIds: any = [];
  bcelQRcodeUrl: string;
  urlSafe: SafeResourceUrl;
  bankDataResponse: QrBankResponseData;
  paymentSelectDisabled = true;
  showAlert = 'hidden';
  beforePoints = 0;
  afterPoints = 0;
  qrPaymentsRef: AngularFirestoreCollection<QrBankResponseData>;
  items_Print: any = [];


  _tickets: any;

  ngOnInit() {
    // console.log(this.data.cart);
    this.loadData();
    this.loadAvailableTicket();
    this.checkPaymentCash('CASH');
    this.loadDeriveries();
    // console.log(this.member);
  }
  async loadData() {
    // this.snackbar.open('Loading data...', 'OK', { duration: 1000 });
    console.log('Loading data...');
    let c = await this.loadInitialData();
  }
  async loadInitialData() {
    let c = await this.generateQRDate();

    let a = await this.data.cart.forEach(element => {
      element['done'] = false;
      element['food_category'] = 'NA';
      element['price'] = element['price'] - element['discount'];
      if (element['disc']) {
        element['food'] = element['food'] + '-' + element['disc'];
        element['food_name_en'] = element['food_name_en'] + '-' + element['sign'];
      } else {
        element['food'] = element['food'];
        element['food_name_en'] = element['food_name_en'];
      }
      // element['kitchen'] = 'NA';
      this.foodList.push(element);
    });


    this.paymentTypes = await this.paymentTypesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    let d = await this.orderForm.get('food').setValue(this.foodList);

    this.tickets = await this.ticketsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const tickets = a.payload.doc.data();
        tickets['id'] = a.payload.doc.id;
        return tickets;
      });
    }));
    let e = await this.backendService.loadCurrentCashloadByUser(JSON.parse(localStorage.getItem('usrObj')).id).then((resp_csh) => {
      resp_csh.subscribe(async (x) => {
        let c = await this.orderForm.get('cashloadId').setValue(x[0].id);
        this.snackbar.open('Cashload ID loaded ' + this.orderForm.get('cashloadId').value, 'OK', { duration: 1000 });
      });
    });
    let m = await this.prepaireItemToPrint();
    // this.snackbar.open('Complete Loading data', 'OK', { duration: 1000 });
    console.log('Complete Loading data');
  }
  prepaireItemToPrint() {
    const items = JSON.parse(localStorage.getItem('cart'));
    items.forEach(item => {
      this.items_Print.push({
        'food_name': item.food_name_en.substring(0, 15),
        'quantity': item.quantity,
        'total': (item.quantity * item.price) - (item.total_discount)
      });
    });
    console.log(this.items_Print);
  }

  paymentProcess() {
    this.paymentBtnDisabled = true;
    // console.log(this.bankDataResponse);

    // tslint:disable-next-line: max-line-length
    if (this.orderForm.valid && this.orderForm.get('username').value != null && this.ticketSelectedId.id && this.orderForm.get('recieved').value) {
      // add Order to Backend
      // Check Cash

      if (this.orderForm.get('paymentType').value === 'CASH') {
        this.backendService.createOrder(this.orderForm.value).then(async (resp_order) => {
          resp_order.subscribe(async (x) => {
            if (x['id'] > 0) {
              this.foodList.forEach(async (food) => {
                const orderDetail = {
                  orderId: this.orderForm.get('orderId').value,
                  foodId: food.foodId,
                  subfoodId: food.subfoodId,
                  foodName: food.food,
                  cost: food.cost,
                  price: food.price - food.discount,
                  quantity: food.quantity,
                  total_price: food.total,
                  total_cost: food.cost * food.quantity,
                  note: food.note,
                  memberId: this.orderForm.get('memberId').value,
                  paymentCode: this.orderForm.get('deriveryDescription').value,
                };
                // console.log(orderDetail);
                let c = await this.backendService.createOrderDetail(orderDetail).then(async (resp_orderDetail) => {
                  resp_orderDetail.subscribe((y) => {
                    console.log('Order detail posted id ' + y['id']);
                  });
                });
              });
              // load data to order realtime db
              console.log('Real time database will process');
              console.log(this.orderForm.value);
              let m = await this.db.collection('orders').add(this.orderForm.value).then((res) => {
                console.log(this.orderForm.value);
                console.log(res);
                this.ticketSelectedId.used = true;
                this.ticketsRef.doc(this.ticketSelectedId.id).update(this.ticketSelectedId).then(() => {
                  if (this.bankDataResponse) {
                    this.qrPaymentsRef.add(this.bankDataResponse).then(() => {
                      this.print_thermal(this.orderForm.get('ticket').value, this.orderForm.get('paymentType').value);
                      localStorage.removeItem('cart');
                      this.dialogRef.close('success');
                      swal({
                        title: 'ສຳເລັດ',
                        text: 'ລາຍການທີ່ສັ່ງຖຶກສົ່ງໄປຄົວແລ້ວ',
                        icon: 'success',
                        timer: 2000
                      });
                    });
                  } else {
                    this.print_thermal(this.orderForm.get('ticket').value, this.orderForm.get('paymentType').value);
                    localStorage.removeItem('cart');
                    this.dialogRef.close('success');
                    swal({
                      title: 'ສຳເລັດ',
                      text: 'ລາຍການທີ່ສັ່ງຖຶກສົ່ງໄປຄົວແລ້ວ',
                      icon: 'success',
                      timer: 2000
                    });
                  }
                });
              }).catch((err) => {
                console.log(err);
              });

            } else {
              alert('Something when wrong!');
              return;
            }
          });
        });
      } else if (this.bankDataResponse) {
        console.log('Bank data');
        this.orderForm.get('qrRefno').setValue(this.bankDataResponse.fccref);
        this.orderForm.get('paymentType').setValue('QR-BCEL');
        console.log(this.orderForm.get('qrRefno').value);
        this.backendService.createOrder(this.orderForm.value).then(async (resp_order) => {
          resp_order.subscribe(async (x) => {
            if (x['id'] > 0) {
              this.foodList.forEach(async (food) => {
                const orderDetail = {
                  orderId: this.orderForm.get('orderId').value,
                  foodId: food.foodId,
                  subfoodId: food.subfoodId,
                  foodName: food.food,
                  cost: food.cost,
                  price: food.price - food.discount,
                  quantity: food.quantity,
                  total_price: food.total,
                  total_cost: food.cost * food.quantity,
                  memberId: this.orderForm.get('memberId').value,
                  paymentCode: this.orderForm.get('deriveryDescription').value,
                };
                let c = await this.backendService.createOrderDetail(orderDetail).then(async (resp_orderDetail) => {
                  resp_orderDetail.subscribe((y) => {
                    console.log('Order detail posted id ' + y['id']);
                  });
                });
              });
              // load data to order realtime db
              console.log('Real time database will process');
              console.log(this.orderForm.value);
              let m = await this.db.collection('orders').add(this.orderForm.value).then((res) => {
                console.log(this.orderForm.value);
                console.log(res);
                this.ticketSelectedId.used = true;
                this.ticketsRef.doc(this.ticketSelectedId.id).update(this.ticketSelectedId).then(() => {
                  if (this.bankDataResponse) {
                    this.qrPaymentsRef.add(this.bankDataResponse).then(() => {
                      this.print_thermal(this.orderForm.get('ticket').value, this.orderForm.get('paymentType').value);
                      localStorage.removeItem('cart');
                      this.dialogRef.close('success');
                      swal({
                        title: 'ສຳເລັດ',
                        text: 'ລາຍການທີ່ສັ່ງຖຶກສົ່ງໄປຄົວແລ້ວ',
                        icon: 'success',
                        timer: 2000
                      });
                    });
                  } else {
                    this.print_thermal(this.orderForm.get('ticket').value, this.orderForm.get('paymentType').value);
                    localStorage.removeItem('cart');
                    this.dialogRef.close('success');
                    swal({
                      title: 'ສຳເລັດ',
                      text: 'ລາຍການທີ່ສັ່ງຖຶກສົ່ງໄປຄົວແລ້ວ',
                      icon: 'success',
                      timer: 2000
                    });
                  }
                });
              });

            } else {
              alert('Something when wrong!');
              return;
            }
          });
        });
      } else {
        this.backendService.createOrder(this.orderForm.value).then(async (resp_order) => {
          resp_order.subscribe(async (x) => {
            if (x['id'] > 0) {
              this.foodList.forEach(async (food) => {
                const orderDetail = {
                  orderId: this.orderForm.get('orderId').value,
                  foodId: food.foodId,
                  subfoodId: food.subfoodId,
                  foodName: food.food,
                  cost: food.cost,
                  price: food.price - food.discount,
                  quantity: food.quantity,
                  total_price: food.total,
                  total_cost: food.cost * food.quantity,
                  memberId: this.orderForm.get('memberId').value,
                  paymentCode: this.orderForm.get('deriveryDescription').value,
                };
                let c = await this.backendService.createOrderDetail(orderDetail).then(async (resp_orderDetail) => {
                  resp_orderDetail.subscribe((y) => {
                    console.log('Order detail posted id ' + y['id']);
                  });
                });
              });
              // load data to order realtime db
              console.log('Real time database will process');
              console.log(this.orderForm.value);
              let m = await this.db.collection('orders').add(this.orderForm.value).then((res) => {
                console.log(this.orderForm.value);
                console.log(res);
                this.ticketSelectedId.used = true;
                this.ticketsRef.doc(this.ticketSelectedId.id).update(this.ticketSelectedId).then(() => {
                  if (this.bankDataResponse) {
                    this.qrPaymentsRef.add(this.bankDataResponse).then(() => {
                      this.print_thermal(this.orderForm.get('ticket').value, this.orderForm.get('paymentType').value);
                      localStorage.removeItem('cart');
                      this.dialogRef.close('success');
                      swal({
                        title: 'ສຳເລັດ',
                        text: 'ລາຍການທີ່ສັ່ງຖຶກສົ່ງໄປຄົວແລ້ວ',
                        icon: 'success',
                        timer: 2000
                      });
                    });
                  } else {
                    this.print_thermal(this.orderForm.get('ticket').value, this.orderForm.get('paymentType').value);
                    localStorage.removeItem('cart');
                    this.dialogRef.close('success');
                    swal({
                      title: 'ສຳເລັດ',
                      text: 'ລາຍການທີ່ສັ່ງຖຶກສົ່ງໄປຄົວແລ້ວ',
                      icon: 'success',
                      timer: 2000
                    });
                  }
                });
              });

            } else {
              alert('Something when wrong!');
              return;
            }
          });
        });
      }

    } else {
      this.snackbar.open('Data incorrect', 'Fail', { duration: 2000, verticalPosition: 'top' });
      this.paymentBtnDisabled = false;
      return;
    }
  }
  checkPaymentCash(payment) {
    // console.log(payment);
    if (payment === 'CASH') {
      this.showPaymentCash = '';
    } else {
      this.showPaymentCash = 'hidden';
    }
  }
  changeCalculation() {
    this.orderForm.get('change').setValue(this.orderForm.get('recieved').value - this.data.total);
  }
  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
  async getTicketById(ticket) {
    const doc = await this.db.collection<Ticket>('tickets', ref => {
      return ref.where('ticket', '==', parseInt(ticket));
    }).snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    })).subscribe(t => {
      t.forEach(_ticket => {
        console.log(_ticket);
        if (_ticket.id) {
          this.ticketSelectedId = _ticket;
        } else {
          this.snackbar.open('Data incorrect on load , please Close and re-open payamnt', 'Fail', { duration: 3000 });
        }
      });
    });
  }
  async generateQRDate() {
    const _uuid1 = uuid.v1();
    const _terminalId = '000001';
    const _amount = this.data.total;
    const _invoiceNumber = this.padding(Math.floor(Math.random() * 60000000000) + 1, 12);
    const _description = 'letterp-POS-transctions';
    this.orderForm.get('invoiceno').setValue(_invoiceNumber);
    // tslint:disable-next-line: max-line-length
    let urlFormat = '/?uuid=' + _uuid1 + '&tid=' + _terminalId + '&amount=' + _amount + '&invoiceId=' + _invoiceNumber + '&description=' + _description;
    this.bcelQRcodeUrl = this.qRCodeUrl + urlFormat;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.bcelQRcodeUrl);
    $('#qrIframe').on('load', () => {
      console.log('QR Code Ready')
      this.getResponseFromDeepstream(_uuid1);
    });
  }
  getResponseFromDeepstream(uuid1) {
    console.log('Started Wait for Complete Payment for ' + uuid1);
    const mcid = 'mch5c481be0ce38f';
    const ds = deepstream('wss://bcel.la:6020/onepayws');
    ds.login({ type: 'invoice', mcid: mcid, uuid: uuid1 }, (success) => {
      if (success) {
        console.log('Login success');
        ds.event.subscribe('invoice/' + mcid + '/' + uuid1 + '/transaction', (data) => {
          if (data) {
            this.bankDataResponse = data;
            this.bankDataResponse.paymentBank = 'QR-BCEL';
            this.bankDataResponse.refno = this.orderForm.get('refno').value;
            this.bankDataResponse.orderId = this.orderForm.get('orderId').value;
            this.orderForm.get('paymentType').setValue('QR-BCEL');
            this.orderForm.get('qrRefno').setValue(data.fccref);
            this.paymentSelectDisabled = true;
            this.showAlert = '';
          } else {
            console.log('Error happend');
          }
        });
      }
    });
  }
  // Thermal printer module
  async print_thermal(ticket, paymentType) {

    if (ticket) {
      const printData = {
        'staff': localStorage.getItem('username'),
        'ticket': ticket,
        'terminal': 'POS-001-' + paymentType,
        'items': this.items_Print,
        'grandTotal': this.data.total,
        'recieved': this.orderForm.get('recieved').value,
        'change': this.orderForm.get('change').value,
        'cardNo': this.member.cardNo,
        'currentPoint': this.member.memberPoints
      };
      const alerts = {
        // tslint:disable-next-line: max-line-length
        message: 'Order created total Amount ' + printData.grandTotal + ' Kip , On ' + printData.terminal + ' By ' + printData.staff + ' at ' + new Date(),
        chat: {
          'id': 568566499,
          'first_name': 'Pedt',
          'username': 'soulisack',
          'type': 'private'
        }
      };
      this.sendMessage(alerts);
      console.log(printData);
      const c = await this.printerService.print_local(printData).then(res => {
        console.log(res);
      });
    }
  }
  async loadAvailableTicket() {
    this.backendService.getAllTickets().then(rsp => {
      rsp.subscribe(tickets => {
        this._tickets = tickets;
      });
    });
  }
  openMember() {
    const dialogRef = this.dialog.open(MembersComponent, { width: '800px' });
    dialogRef.afterClosed().subscribe(member => {
      if (!member) {
        this.orderForm.get('memberId').setValue('');
        this.orderForm.get('memberName').setValue('');
        return;
      }
      this.member = member;
      this.orderForm.get('memberId').setValue(member['mId']);
      this.orderForm.get('memberName').setValue(member['cardNo'] + '|' + member['fullname'] + '|' + member['mobile']);
      console.log(member);
    });
  }
  loadDeriveries() {
    this.backendService.getDeriveries().then(r => {
      r.subscribe(deriveries => {
        this.deriveries = deriveries;
      });
    });
  }
  deriveryProviderSelectChange($event) {
    this.deriveryDescription = $event.target.options[$event.target.options.selectedIndex].text;
    this.orderForm.get('deriveryDescription').setValue($event.target.options[$event.target.options.selectedIndex].text);
    console.log(this.deriveryDescription);
  }
  sendMessage(alerts) {
    this.backendService.sendMessage(alerts).then(r => {
      r.subscribe(rsp => {
        this.snackbar.open('Alert Send', 'OK', { duration: 3000 });
      });
    });
    return;
  }
  getExchangeRate() {
    this.backendServices.getExchangeRate().then(exch => {
      exch.subscribe(rates => {
        this.exchangeRates = rates;
      });
    });
  }
}
