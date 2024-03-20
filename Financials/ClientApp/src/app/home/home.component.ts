import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Security } from '../interfaces/security';
import { SecurityService } from '../services/security.service';
import { SecurityResourceParameters } from '../interfaces/securityresourceparameters';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Earning } from '../interfaces/earnings/earning';
import { StockPurchaseOption } from '../interfaces/StockPurchaseOption';
import { StockPurchaseOptionsResourceParameters } from '../interfaces/resourceparameters/StockPurchaseOptionsResourceParameters';
import { StockScreenerSearchResourceParameters } from '../interfaces/resourceparameters/StockScreenerSearchResourceParameters';
import { ScreenerCriteria } from '../interfaces/stockscreener/ScreenerCriteria';
//ng g c dividend --module app


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [NgbPopoverConfig] // add NgbPopoverConfig to the component providers
})
export class HomeComponent {

 // public preferredsecurities: PreferredSecurities[];
  public stockPurchaseOptions: StockPurchaseOption[];
  public securities: Security[];
  public earnings: Earning[];
  
  
  percent15DropLowScreenerCriterias: ScreenerCriteria[];
  percent15DropCurrentScreenerCriterias: ScreenerCriteria[];


  percent10DropLowScreenerCriterias: ScreenerCriteria[];
  percent10DropCurrentScreenerCriterias: ScreenerCriteria[];

  percent5DropLowScreenerCriterias: ScreenerCriteria[];
  percent5DropCurrentScreenerCriterias: ScreenerCriteria[];


  templateScreenerCritierias: ScreenerCriteria[];
  averageDropScreenerCritierias: ScreenerCriteria[];


  averageDropCurrentScreenerCriterias: ScreenerCriteria[];


  //  const headers = new HttpHeaders().append('header', 'value');
  //this.http.get('url', { headers, params }); 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private securityService: SecurityService, config: NgbPopoverConfig) {

    config.placement = 'bottom';
    config.triggers = 'hover';
    /*
    http.get<PreferredSecurities[]>(baseUrl + 'preferredsecurity').subscribe(result => {
      this.preferredsecurities = result;

    }, error => console.error(error));
    */
  }




  ngOnInit() {
    //this.setAverageDrop();
    




    
    
    this.GetAllScreenerCriterias();
    
  //  this.getSecurities();
  }

  


  GetAllScreenerCriterias(): void {
    this.securityService.GetAllScreenerCriterias().subscribe(screenerCritieriaResults => {
      this.templateScreenerCritierias = screenerCritieriaResults;
      for (var i = 0; i < this.templateScreenerCritierias.length; i++) {
        this.templateScreenerCritierias[i].value = '';
        this.templateScreenerCritierias[i].boolValue = false;

      }
      this.templateScreenerCritierias.sort((a, b) => a.sortPriority - b.sortPriority);
      this.setAverageDrop();
      this.setaverageDropCurrent();
      this.setpercent15DropLow();
      this.setpercent15DropCurrent();
      this.setpercent10DropLow();
      this.setpercent10DropCurrent();
      this.setpercent5DropLow();
      this.setpercent5DropCurrent();
    });



  }



  getStockPurchaseOptions(): void {

    /*
    this.securityService.getStockPurchaseOptions().subscribe(stockPurchaseOptions =>

      this.stockPurchaseOptions = stockPurchaseOptions

    );
    */
  }
  
  getSecurities(): void {
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    securitySearch.preferred = true;
    this.securityService.getSecurities(securitySearch)
      .subscribe(prefsecurities => this.securities = prefsecurities);
  } 

  viewProfile(val) {


    const params = new HttpParams().set('securityId', val);
    
    


    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: val };
    this.http.put<any>(this.baseUrl + 'security/' + val, body, {headers, params}).subscribe(result => {
      this.securities = null;
      this.http.get<Security[]>(this.baseUrl + 'preferredsecurity').subscribe(result => {
        this.securities = result;

      }, error => console.error(error));

    }, error => console.error(error));


    

  }



  


  setaverageDropCurrent(): void {

    this.averageDropCurrentScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.averageDropCurrentScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.averageDropCurrentScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.averageDropCurrentScreenerCriterias[i].value = 'current'
      }
      if (this.averageDropCurrentScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.averageDropCurrentScreenerCriterias[i].value = 'averagetimesoneandhalfpercent'
      }

      if (this.averageDropCurrentScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.averageDropCurrentScreenerCriterias[i].value = '1000000'
      }
      if (this.averageDropCurrentScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.averageDropCurrentScreenerCriterias[i].value = '10'
      }
      if (this.averageDropCurrentScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.averageDropCurrentScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }



    


  }

  setpercent15DropLow(): void {

    


    this.percent15DropLowScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.percent15DropLowScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.percent15DropLowScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.percent15DropLowScreenerCriterias[i].value = 'daylow'
      }
      if (this.percent15DropLowScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.percent15DropLowScreenerCriterias[i].value = 'percentile15'
      }

      if (this.percent15DropLowScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.percent15DropLowScreenerCriterias[i].value = '1000000'
      }
      if (this.percent15DropLowScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.percent15DropLowScreenerCriterias[i].value = '10'
      }
      if (this.percent15DropLowScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.percent15DropLowScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }

  }

  setpercent15DropCurrent(): void {


    this.percent15DropCurrentScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.percent15DropCurrentScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.percent15DropCurrentScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.percent15DropCurrentScreenerCriterias[i].value = 'current'
      }
      if (this.percent15DropCurrentScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.percent15DropCurrentScreenerCriterias[i].value = 'percentile15'
      }

      if (this.percent15DropCurrentScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.percent15DropCurrentScreenerCriterias[i].value = '1000000'
      }
      if (this.percent15DropCurrentScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.percent15DropCurrentScreenerCriterias[i].value = '10'
      }
      if (this.percent15DropCurrentScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.percent15DropCurrentScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }

   
  }


  setAverageDrop(): void {
    this.averageDropScreenerCritierias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.averageDropScreenerCritierias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.averageDropScreenerCritierias[i].jsonObjectName == "percentDropType") {
        this.averageDropScreenerCritierias[i].value = 'daylow'
      }
      if (this.averageDropScreenerCritierias[i].jsonObjectName == "calculatedPercentDropType") {
        this.averageDropScreenerCritierias[i].value = 'averagetimesoneandhalfpercent'
      }

      if (this.averageDropScreenerCritierias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.averageDropScreenerCritierias[i].value = '1000000'
      }
      if (this.averageDropScreenerCritierias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.averageDropScreenerCritierias[i].value = '10'
      }
      if (this.averageDropScreenerCritierias[i].jsonObjectName == "ipoDateRangeStart") {
        this.averageDropScreenerCritierias[i].dateValue = new Date('1/1/2010');
      }
    }

  }




  setpercent10DropLow(): void {

    this.percent10DropLowScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.percent10DropLowScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.percent10DropLowScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.percent10DropLowScreenerCriterias[i].value = 'daylow'
      }
      if (this.percent10DropLowScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.percent10DropLowScreenerCriterias[i].value = 'percentile10'
      }

      if (this.percent10DropLowScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.percent10DropLowScreenerCriterias[i].value = '1000000'
      }
      if (this.percent10DropLowScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.percent10DropLowScreenerCriterias[i].value = '10'
      }
      if (this.percent10DropLowScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.percent10DropLowScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }

  }

  setpercent10DropCurrent(): void {

    this.percent10DropCurrentScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.percent10DropCurrentScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.percent10DropCurrentScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.percent10DropCurrentScreenerCriterias[i].value = 'current'
      }
      if (this.percent10DropCurrentScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.percent10DropCurrentScreenerCriterias[i].value = 'percentile10'
      }

      if (this.percent10DropCurrentScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.percent10DropCurrentScreenerCriterias[i].value = '1000000'
      }
      if (this.percent10DropCurrentScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.percent10DropCurrentScreenerCriterias[i].value = '10'
      }
      if (this.percent10DropCurrentScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.percent10DropCurrentScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }



  }


  setpercent5DropLow(): void {

    this.percent5DropLowScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.percent5DropLowScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.percent5DropLowScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.percent5DropLowScreenerCriterias[i].value = 'daylow'
      }
      if (this.percent5DropLowScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.percent5DropLowScreenerCriterias[i].value = 'percentile5'
      }

      if (this.percent5DropLowScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.percent5DropLowScreenerCriterias[i].value = '1000000'
      }
      if (this.percent5DropLowScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.percent5DropLowScreenerCriterias[i].value = '10'
      }
      if (this.percent5DropLowScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.percent5DropLowScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }

  }

  setpercent5DropCurrent(): void {

    this.percent5DropCurrentScreenerCriterias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    var criteriaLength = this.percent5DropCurrentScreenerCriterias.length
    for (var i = 0; i < criteriaLength; i++) {
      if (this.percent5DropCurrentScreenerCriterias[i].jsonObjectName == "percentDropType") {
        this.percent5DropCurrentScreenerCriterias[i].value = 'current'
      }
      if (this.percent5DropCurrentScreenerCriterias[i].jsonObjectName == "calculatedPercentDropType") {
        this.percent5DropCurrentScreenerCriterias[i].value = 'percentile5'
      }

      if (this.percent5DropCurrentScreenerCriterias[i].jsonObjectName == "securityVolumeRangeLow") {
        this.percent5DropCurrentScreenerCriterias[i].value = '1000000'
      }
      if (this.percent5DropCurrentScreenerCriterias[i].jsonObjectName == "priorPurchaseEstimateYearlyPercentRangeLow") {
        this.percent5DropCurrentScreenerCriterias[i].value = '10'
      }
      if (this.percent5DropCurrentScreenerCriterias[i].jsonObjectName == "ipoDateRangeStart") {
        this.percent5DropCurrentScreenerCriterias[i].dateValue = new Date('1/1/2010');
      }
    }
  }

}


