import { LoadingScreenService } from './../../services/loading-screen/loading-screen.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.css']
})
export class LoadingscreenComponent implements OnInit, OnDestroy {

  constructor(private loadingScreenService: LoadingScreenService) { }
  loading = false;
  loadingSubscription: Subscription;

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
