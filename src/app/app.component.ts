import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PrimeApplicationLayoutComponent } from './layout/prime-application-layout/prime-application-layout.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent implements OnInit {

  menuMode = 'horizontal';

  lightMenu = true;

  theme = 'blue';

  inputStyle = 'outlined';

  ripple: boolean;

  constructor(private replaceableComponents: ReplaceableComponentsService,
    private primengConfig: PrimeNGConfig) {
    this.replaceableComponents.add({
      component: PrimeApplicationLayoutComponent,
      key: eThemeLeptonXComponents.ApplicationLayout,
    });
    
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.ripple = true;
  }
}
