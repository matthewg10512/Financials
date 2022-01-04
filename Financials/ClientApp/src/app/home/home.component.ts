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
  public percent15DropLowParam: StockPurchaseOptionsResourceParameters;
  public averageDropCurrentParam: StockPurchaseOptionsResourceParameters;
  public percent15DropCurrentParam: StockPurchaseOptionsResourceParameters;
  
  
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
    this.setpercent15Droppers();
    this.setaverageDropCurrentParam();
    this.setpercent15DropCurrentParam();
  //  this.getSecurities();
  }

  

  setpercent15Droppers(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent15Low';
    stockOptionResourceParams.securityPurchaseCheckSharesRangeLow = '60';
    stockOptionResourceParams.securityPurchaseCheckYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.averageDropCurrentParam = stockOptionResourceParams;
  }

  
  setaverageDropCurrentParam(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'averagedrop50CurrentPrice';
    stockOptionResourceParams.securityPurchaseCheckSharesRangeLow = '60';
    stockOptionResourceParams.securityPurchaseCheckYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.averageDropCurrentParam = stockOptionResourceParams;
  }

  setpercent15DropCurrentParam(): void {
    let stockOptionResourceParams: StockPurchaseOptionsResourceParameters = new StockPurchaseOptionsResourceParameters();
    var d = new Date();
    d.setDate(d.getDate() - 2);
    stockOptionResourceParams.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//d;
    stockOptionResourceParams.securitypercentChangeRangeHigh = '0';
    stockOptionResourceParams.securityPercentDropperType = 'percent15CurrentPrice';
    stockOptionResourceParams.securityPurchaseCheckSharesRangeLow = '60';
    stockOptionResourceParams.securityPurchaseCheckYearlyPercentRangeLow = '10';
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
    stockOptionResourceParams.securityPurchaseCheckSharesRangeLow = '60';
    stockOptionResourceParams.securityPurchaseCheckYearlyPercentRangeLow = '10';
    stockOptionResourceParams.securityVolumeRangeLow = '100000';
    this.averageDropLowParam = stockOptionResourceParams;
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




}


