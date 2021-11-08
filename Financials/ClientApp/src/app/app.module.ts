/// <reference path="../../node_modules/@coreui/angular/lib/sidebar/app-sidebar-nav/app-sidebar-nav-item-class.pipe.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SecurityComponent } from './security/security-component';
import { EarningComponent } from './earning/earning-component';


import { SecurityDetailComponent } from './security-detail/security-detail.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateSecurityComponent } from './widget/updateSecurity/update-security.component';
import { TopMoversComponent } from './widget/topMovers/top-movers.component';
import { UpdateHistoricalPriceComponent } from './widget/historicDate/update-historical-date.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchSecurityComponent } from './widget/searchSecurity/search-security.component';
import { SideBarMenuComponent } from './side-menu/sidebar-menu.component';

import { ChartsModule } from 'ng2-charts';
import { EarningWidgetComponent } from './widget/earning/earning-widget.component';
import { DividendComponent } from './dividend/dividend.component';
import { DividendWidgetComponent } from './widget/dividend/dividend-widget.component';
import { LoadingDataComponent } from './shared/loading-data/loading-data.component';
import { PercentageChangersComponent } from './widget/percentage-changers/percentage-changers.component';
import { AutoSecurityTradeComponent } from './auto-security-trade/auto-security-trade.component';
import { SecurityInvestProjectionComponent } from './security-invest-projection/security-invest-projection.component';
import { SecurityProjectionComponent } from './widget/invest-projections/security-projection/security-projection.component';
import { YearlyBreakdownComponent } from './widget/invest-projections/yearly-breakdown/yearly-breakdown.component';


//'./widget/historicdDate/update-historical-date.component';

@NgModule({
  declarations: [
    AppComponent,
    
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SecurityComponent,
    EarningWidgetComponent,
    SecurityDetailComponent,
    UpdateSecurityComponent,
    TopMoversComponent,
    UpdateHistoricalPriceComponent,
    SearchSecurityComponent,
    SideBarMenuComponent,
    EarningComponent,
    DividendComponent,
    DividendWidgetComponent,
    LoadingDataComponent,
    PercentageChangersComponent,
    AutoSecurityTradeComponent,
    SecurityInvestProjectionComponent,
    SecurityProjectionComponent,
    YearlyBreakdownComponent,
    
    
  ],
  imports: [
    
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'earning', component: EarningComponent },
      { path: 'dividend', component: DividendComponent },
      { path: 'detail/:id', component: SecurityDetailComponent },
      { path: 'auto-security-trade', component: AutoSecurityTradeComponent },
      { path: 'security-invest-projection', component: SecurityInvestProjectionComponent }
      


    ]),
    BrowserAnimationsModule,
    NgbModule,
    ChartsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
