import {RouterEvents, SubscriptionService} from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class LayoutService {
  isCollapsed = true;

  smallScreen!: boolean; // do not set true or false

  logoComponentKey = eThemeLeptonXComponents.Logo;

  routesComponentKey = eThemeLeptonXComponents.Routes;

  navItemsComponentKey = eThemeLeptonXComponents.NavItems;

  constructor(private subscription: SubscriptionService,
              private cdRef: ChangeDetectorRef,
              routerEvents:RouterEvents) {
    subscription.addOne(routerEvents.getNavigationEvents("End"),() => {
      this.isCollapsed = true;
    })
  }

  private checkWindowWidth() {
    const isSmallScreen = window.innerWidth < 992;
    if (isSmallScreen && this.smallScreen === false) {
      this.isCollapsed = false;
      setTimeout(() => {
        this.isCollapsed = true;
      }, 100);
    }
    this.smallScreen = isSmallScreen;
    this.cdRef.detectChanges();
  }

  subscribeWindowSize() {
    this.checkWindowWidth();

    const resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    this.subscription.addOne(resize$, () => this.checkWindowWidth());
  }
}
