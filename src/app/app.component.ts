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

    this.primengConfig.setTranslation({
      startsWith: 'ile başlayan',
      contains: 'içeren',
      notContains: 'içermeyen',
      endsWith: 'ile biten',
      equals: 'eşit',
      notEquals: 'eşit değil',
      lt: 'küçüktür',
      lte: 'küçük eşittir',
      gt: 'büyüktür',
      gte: 'büyük eşittir',
      apply: 'Uygula',
      choose: 'Seç',
      upload: 'Yükle',
      cancel: 'Vazgeç',
      dayNames: ['pazar', 'pazartesi', 'salı', 'çarşamba', 'perşembe', 'cuma', 'cumartesi'],
      dayNamesShort: ['pz', 'pzt', 'sal', 'çar', 'per', 'cum', 'cmt'],
      dayNamesMin: ['PZ', 'PZT', 'S', 'C', 'P', 'CU', 'CMT'],
      monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
      monthNamesShort: ['oc', 'şub', 'mar', 'nis', 'may', 'hz', 'tem', 'ağu', 'eyl', 'ek', 'kas', 'ara'],
      today: 'Bugün',
      clear: 'Temizle',
      weekHeader: 'Hafta',
      firstDayOfWeek: 1
  });
  }
}
