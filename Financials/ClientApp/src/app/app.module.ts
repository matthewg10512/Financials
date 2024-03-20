/// <reference path="../../node_modules/@coreui/angular/lib/sidebar/app-sidebar-nav/app-sidebar-nav-item-class.pipe.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
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
import { PurchaseDetailComponent } from './widget/invest-projections/purchase-detail/purchase-detail.component';
import { DetailsComponent } from './widget/security-details/details/details.component';
import { GainLossComponent } from './widget/security-details/gain-loss/gain-loss.component';
import { StockPurchaseOptionComponent } from './widget/StockPurchaseOption/stock-purchase-option/stock-purchase-option.component';
import { SpoPeakRangeComponent } from './widget/StockPurchaseOption/spo-peak-range/spo-peak-range.component';
import { SpoSecPurStatComponent } from './widget/StockPurchaseOption/spo-sec-pur-stat/spo-sec-pur-stat.component';
import { SpoInvestProjectionComponent } from './widget/StockPurchaseOption/spo-invest-projection/spo-invest-projection.component';
import { SpoSecDetailComponent } from './widget/StockPurchaseOption/spo-sec-detail/spo-sec-detail.component';
import { StockScreenerComponent } from './stock-screener/stock-screener.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';


import { MatSelectModule } from '@angular/material/select';


import { MatNativeDateModule } from '@angular/material/core';
import { SecurityAnalyticsComponent } from './security-analytics/security-analytics.component';


//'./widget/historicdDate/update-historical-date.component';

@NgModule({
  declarations: [
    AppComponent,
    
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
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
    PurchaseDetailComponent,
    DetailsComponent,
    GainLossComponent,
    StockPurchaseOptionComponent,
    SpoPeakRangeComponent,
    SpoSecPurStatComponent,
    SpoInvestProjectionComponent,
    SpoSecDetailComponent,
    StockScreenerComponent,
    SecurityAnalyticsComponent,
    
    
  ],
  imports: [
    
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'earning', component: EarningComponent },
      { path: 'dividend', component: DividendComponent },
      { path: 'detail/:id', component: SecurityDetailComponent },
      { path: 'auto-security-trade', component: AutoSecurityTradeComponent },
      { path: 'security-invest-projection', component: SecurityInvestProjectionComponent }
      ,
      { path: 'stock-screener', component: StockScreenerComponent },
      { path: 'security-analytics', component: SecurityAnalyticsComponent }
      


    ]),
    BrowserAnimationsModule,
    NgbModule,
    ChartsModule,

     MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
