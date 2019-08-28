import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements OnInit {
  @ViewChild('CardNo')
  private CardNoDiv: ElementRef;
  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<ViewMemberComponent>, private dp: DatePipe) {
    this.loadMemberCategories();
    this.loadMemberInfo();
  }
  member: any;
  memberForm: FormGroup;
  memberCategories: any;
  memberPhoto: string;
  showMemberForm = 'hidden';
  ngOnInit() {
    this.memberForm = new FormGroup({
      id: new FormControl(),
      memberCode: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      fullname: new FormControl(),
      dateOfBirth: new FormControl(new Date()),
      currentAddress: new FormControl(),
      mobile: new FormControl(),
      tel: new FormControl(),
      facebook: new FormControl(),
      whatsapp: new FormControl(),
      line: new FormControl(),
      photo: new FormControl(),
      idCard: new FormControl(),
      cardId: new FormControl(),
      deleted: new FormControl(0),
      memberCategoryId: new FormControl(),
      levelId: new FormControl(),
      userId: new FormControl(),
      enabled: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });
  }
  async loadMemberInfo() {
    this.backendService.getMemberById(this.data.memberId).then(r => {
      r.subscribe(async (member) => {
        this.member = member;
        this.memberForm.setValue(member[0]);
        this.memberForm.get('dateOfBirth').setValue(this.dp.transform(member[0].dateOfBirth, 'yyyy-MM-dd'));
        this.memberPhoto = member[0].photo;
        this.loadMemberCategories();
        this.loadCardNumber(parseInt(member[0].cardId, 10));
        this.showMemberForm = '';
        // console.log(this.memberForm.value);
      });
    });
  }
  loadMemberCategories() {
    this.backendService.getCategories().then(r => {
      r.subscribe(cat => this.memberCategories = cat);
    });
  }
  loadCardNumber(id) {
    this.backendService.getCardById(id).then(r => {
      r.subscribe(card => {
        // this.memberForm.get('cardNo').setValue(card[0].cardNo);
        this.CardNoDiv.nativeElement.value = card[0].cardNo;
      });
    });
  }
  saveMember() {
    if (this.memberForm) {
      this.backendService.updateMember(this.memberForm.get('id').value, this.memberForm.value).then(r => {
        r.subscribe(rsp => {
          if (rsp[0] === 1) {
            this.dialogRef.close('success');
            Swal.fire({
              title: 'Successful',
              text: 'ຂໍ້ມູນລຸກຄ້າ ແກ້ໄຂສຳເລັດ',
              type: 'success',
              timer: 2000,
            });
          } else {
            Swal.fire({
              title: 'Some field incomplete',
              text: rsp['message'],
              type: 'error',
            });
            return;
          }
        });
      });
    }
  }
}
