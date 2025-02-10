import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
//import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { FeatureManagementModule } from '@abp/ng.feature-management';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { SharedModule } from './shared/shared.module';
import { PrimeApplicationLayoutComponent } from './layout/prime-application-layout/prime-application-layout.component';
import { AppMenuComponent } from './layout/menu/app.menu.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { LanguageComponent } from './layout/language/language.component';
import { CurrentUserComponent } from './layout/current-user/current-user.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer
} from 'echarts/renderers';
import Marcaron from './shared/common/marcaron';
import { CommonService } from './services/common.service';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
);
echarts.registerTheme('macarons', Marcaron);

import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import * as moment from 'moment';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    AbpOAuthModule.forRoot(),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    //TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeLeptonXModule.forRoot(),
    SideMenuLayoutModule.forRoot(),
    FeatureManagementModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts }),
  ],
  declarations: [AppComponent,
    PrimeApplicationLayoutComponent,
    AppMenuComponent,
    TopbarComponent,
    LanguageComponent,
    CurrentUserComponent
  ],
  providers: [
    APP_ROUTE_PROVIDER,
    {
      provide: APP_INITIALIZER,
      useFactory: (global: CommonService) => () => global.setInitialData(), deps: [CommonService], multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    this.overrideDate();
  }

  overrideDate() {
    Date.prototype.toJSON = function() {
      debugger;
      return moment(this).format("yyyy-MM-DDTHH:mm");
    };
  }
}
