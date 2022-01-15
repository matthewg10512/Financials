import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Security } from '../interfaces/security';
import { SecurityService } from '../services/security.service';
import { SecurityResourceParameters } from '../interfaces/securityresourceparameters';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Earning } from '../interfaces/earning';
import { StockPurchaseOption } from '../interfaces/StockPurchaseOption';
import { StockPurchaseOptionsResourceParameters } from '../interfaces/resourceparameters/StockPurchaseOptionsResourceParameters';
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
  public averageDropLowParam: StockPurchaseOptionsResourceParameters;
  public averageDropCurrentParam: StockPurchaseOptionsResourceParameters;
  public percent15DropLowParam: StockPurchaseOptionsResourceParameters;
  public percent15DropCurrentParam: StockPurchaseOptionsResourceParameters;


  public percent10DropLowParam: StockPurchaseOptionsResourceParameters;
  public percent10DropCurrentParam: StockPurchaseOptionsResourceParameters;

  public percent5DropLowParam: StockPurchaseOptionsResourceParameters;
  public percent5DropCurrentParam: StockPurchaseOptionsResourceParameters;
  
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
    this.setAverageDrop();
    this.setaverageDropCurrent();

    this.setpercent15DropLow();
    this.setpercent15DropCurrent();


    this.setpercent10DropLow();
    this.setpercent10DropCurrent();
    this.setpercent5DropLow();
    this.setpercent5DropCurrent();

    
  //  this.getSecurities();
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
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'averagedrop50CurrentPrice';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.averageDropCurrentParam = stockOptionResourceParams;
  }

  setpercent15DropLow(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent15Low';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.percent15DropLowParam = stockOptionResourceParams;
  }

  setpercent15DropCurrent(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent15CurrentPrice';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.percent15DropCurrentParam = stockOptionResourceParams;
  }


  setAverageDrop(): void {

    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'averagedrop50Low';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.averageDropLowParam = stockOptionResourceParams;
  }




  setpercent10DropLow(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent10Low';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.percent10DropLowParam = stockOptionResourceParams;
  }

  setpercent10DropCurrent(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent10CurrentPrice';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.percent10DropCurrentParam = stockOptionResourceParams;
  }


  setpercent5DropLow(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent5Low';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.percent5DropLowParam = stockOptionResourceParams;
  }

  setpercent5DropCurrent(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent5CurrentPrice';
    stockOptionResourceParams.priorPurchaseEstimateSharesRangeLow = '60';
    stockOptionResourceParams.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.percent5DropCurrentParam = stockOptionResourceParams;
  }

}


