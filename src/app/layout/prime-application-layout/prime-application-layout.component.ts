import { SubscriptionService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../../app.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-prime-application-layout',
  templateUrl: './prime-application-layout.component.html',
  styleUrls: ['./prime-application-layout.component.scss'],
  providers: [LayoutService, SubscriptionService],
})
export class PrimeApplicationLayoutComponent implements OnInit {

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  menuHoverActive: boolean = false;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  configActive: boolean;

  configClick: boolean;

  constructor(
    public app: AppComponent,
    private primengConfig: PrimeNGConfig,
    public service: LayoutService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.rightPanelClick) {
      this.rightPanelActive = false;
    }

    if (!this.menuClick) {
      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }
      this.menuHoverActive = false;
    }

    if (this.configActive && !this.configClick) {
      this.configActive = false;
    }

    this.configClick = false;
    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightPanelClick = false;
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isOverlay()) {
      this.overlayMenuActive = !this.overlayMenuActive;
    }
    if (this.isDesktop()) {
      this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
    } else {
      this.staticMenuMobileActive = !this.staticMenuMobileActive;
    }

    event.preventDefault();
  }

  onMenuClick($event) {
    this.menuClick = true;
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;
    event.preventDefault();
  }

  onRippleChange(event) {
    this.app.ripple = event.checked;
  }

  onConfigClick(event) {
    this.configClick = true;
  }

  onRightPanelClick() {
    this.rightPanelClick = true;
  }

  isHorizontal() {
    return this.app.menuMode === 'horizontal';
  }

  isSlim() {
    return this.app.menuMode === 'slim';
  }

  isOverlay() {
    return this.app.menuMode === 'overlay';
  }

  isStatic() {
    return this.app.menuMode === 'static';
  }

  isMobile() {
    return window.innerWidth < 1025;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

}
