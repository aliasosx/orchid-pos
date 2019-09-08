import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { BomService } from 'src/app/services/bom.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  constructor(private bomService: BomService, private backendService: BackendServiceService) { }
  allCurrencies: any;
  currencyForm: FormGroup;
  @Input('selectedCurrId') id: number;

  @Output() add = new EventEmitter<any>();
  ngOnInit() {
    this.currencyForm = new FormGroup({
      currCodeId: new FormControl(this.id)
    });
    this.loadCurrencies();
  }
  public loadCurrencies() {
    this.backendService.getCurrencies().then(r => {
      r.subscribe(curr => this.allCurrencies = curr);
    });
  }
  changeCurrency() {
    this.add.emit(this.currencyForm.get('currCodeId').value);
  }
}
