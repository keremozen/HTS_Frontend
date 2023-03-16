import { ApplicationInfo } from '@abp/ng.core';
import { Component, HostBinding } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { environment } from 'src/environments/environment';
import { PrimeApplicationLayoutComponent } from '../prime-application-layout/prime-application-layout.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @HostBinding('class.mx-auto')
  marginAuto = true;

  appInfo: ApplicationInfo;

  constructor(public app: PrimeApplicationLayoutComponent,
    public service: LayoutService) {
    this.appInfo = environment.application;
  }

  get smallScreen() {
    return window.innerWidth < 992;
  }

}
