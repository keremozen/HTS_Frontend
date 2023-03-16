import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule, SubscriptionService } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ChangeDetectorRef, NgModule } from '@angular/core';
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
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeLeptonXModule.forRoot(),
    SideMenuLayoutModule.forRoot(),
    FeatureManagementModule.forRoot()
  ],
  declarations: [AppComponent, PrimeApplicationLayoutComponent, AppMenuComponent, TopbarComponent, LanguageComponent, CurrentUserComponent],
  providers: [
    APP_ROUTE_PROVIDER
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
