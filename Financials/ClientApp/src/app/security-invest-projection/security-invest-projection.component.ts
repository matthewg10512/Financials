import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { HistoricalPrice } from '../interfaces/historicalprice';
import { Security } from '../interfaces/security';
import { Dividend } from '../interfaces/dividend';


import { ViewChild } from '@angular/core';
import { InvestProjectionStockFactory } from '../classes/InvestmentProjection/investprojectionstockfactory';
import { InvestProjectionStock } from '../classes/InvestmentProjection/investprojectionstock';
import { investmentprojectionsresourceparameters } from '../interfaces/resourceparameters/investmentprojectionsresourceparameters';
import { InvestProjection } from '../classes/InvestmentProjection/investprojection';
import { investmentprojectionforupdate } from '../interfaces/investmentprojectionforupdate';
import { investmentprojectionforadd } from '../interfaces/investmentprojectionforadd';
@Component({
  selector: 'app-security-invest-projection',
  templateUrl: './security-invest-projection.component.html',
  styleUrls: ['./security-invest-projection.component.css']

})

export class SecurityInvestProjectionComponent implements OnInit {
  currentActionItem = 'populatesecurityid';

  investProjectionStockFactoryList: InvestProjectionStockFactory[];
  investProjectionStockFactory: InvestProjectionStockFactory;
  //investProjectionStocks: InvestProjectionStock[];

 // investProjections: InvestProjection[];
  @ViewChild('myModalClose', { static: false }) modalClose;


  constructor(
    private prefSecurityService: SecurityService) {

    
    this.investProjectionStockFactory = new InvestProjectionStockFactory();
  }

  isCollapsed: boolean = true;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }


  ngOnInit() {

    //this.getHistoricalPrices();
    /*
    let securityList: number[] = [];
    securityList.push(175); //amazon
    securityList.push(251);//apple
    securityList.push(2348);//netflix
    securityList.push(814);//costco
    
    let securityCount: number = securityList.length;
    for (var i = 0; i < securityCount; i++) {
      this.addSecurity(securityList[i]);
    }
    */



    let invprojRP: investmentprojectionsresourceparameters = new investmentprojectionsresourceparameters();
    invprojRP.userId = 1;
    this.prefSecurityService.getInvestmentProjectionsSecurities(invprojRP).subscribe(investProjections => {
      this.investProjectionStockFactoryList = [];
      this.investProjectionStockFactoryList.push(new InvestProjectionStockFactory());
      this.investProjectionStockFactoryList.push(...investProjections);
      
      

    });
    

    //this.investProjectionStockFactory.investProjectionStocks.push(investProjectionStock);
  }

  onInvestProjectionChange(value: number): void {
    this.investProjectionStockFactory = new InvestProjectionStockFactory();



    this.selectSavedInvestProjection(Number(value));



    
  }

  selectSavedInvestProjection(projectionId: number): void {
    this.investProjectionStockFactory = new InvestProjectionStockFactory();

    let index = this.investProjectionStockFactoryList.findIndex(x => x.id === projectionId);
    if (index == -1) {
      return;
    }
    

    this.investProjectionStockFactory.repeatInvestmentFrequency = this.investProjectionStockFactoryList[index].repeatInvestmentFrequency;

    this.investProjectionStockFactory.purchaseFrequency = this.investProjectionStockFactoryList[index].purchaseFrequency;
    this.investProjectionStockFactory.repeatInvestmentAmount = this.investProjectionStockFactoryList[index].repeatInvestmentAmount;
    this.investProjectionStockFactory.yearRangeHigh = this.investProjectionStockFactoryList[index].yearRangeHigh;
    this.investProjectionStockFactory.yearRangeLow = this.investProjectionStockFactoryList[index].yearRangeLow;
    this.investProjectionStockFactory.projectionName = this.investProjectionStockFactoryList[index].projectionName;
    this.investProjectionStockFactory.id = this.investProjectionStockFactoryList[index].id;
    this.investProjectionStockFactory.userId = this.investProjectionStockFactoryList[index].userId;

    var securityLength = this.investProjectionStockFactoryList[index].securities.length;
    for (var i = 0; i < securityLength; i++) {
      this.addSecurity(this.investProjectionStockFactoryList[index].securities[i].id);
    }
  }

  newInvestmentProjection(): void {
    
    let investmentprojectionforadddto: investmentprojectionforadd = new investmentprojectionforadd();
    investmentprojectionforadddto.userId = this.investProjectionStockFactory.userId;
    investmentprojectionforadddto.projectionName = this.investProjectionStockFactory.projectionName;
    investmentprojectionforadddto.repeatInvestmentAmount = Number(this.investProjectionStockFactory.repeatInvestmentAmount);
    investmentprojectionforadddto.repeatInvestmentFrequency = Number(this.investProjectionStockFactory.repeatInvestmentFrequency);
    investmentprojectionforadddto.purchaseFrequency = Number(this.investProjectionStockFactory.purchaseFrequency);
    investmentprojectionforadddto.yearRangeLow = Number(this.investProjectionStockFactory.yearRangeLow);
    investmentprojectionforadddto.yearRangeHigh = Number(this.investProjectionStockFactory.yearRangeHigh);
    investmentprojectionforadddto.securities = [];

    let projStockCount = this.investProjectionStockFactory.investProjectionStocks.length;
    for (var i = 0; i < projStockCount; i++) {
      investmentprojectionforadddto.securities.push(this.investProjectionStockFactory.investProjectionStocks[i].securityRecord);
    }


    this.prefSecurityService.addInvestmentProjection(investmentprojectionforadddto).subscribe(prefsecurities => {


      this.investProjectionStockFactory.id = Number(prefsecurities);
      let stockCount = this.investProjectionStockFactory.investProjectionStocks.length;

      for (var i = 0; i < stockCount; i++) {
        this.investProjectionStockFactory.securities.push(this.investProjectionStockFactory.investProjectionStocks[i].securityRecord);
      }
      

      this.investProjectionStockFactoryList.push(this.investProjectionStockFactory);


    }); 
  }

  peakRangeInfo(): void{
    this.prefSecurityService.GetPeakRangeDetails(251).subscribe(prefsecurities => {

    }); 
  }

  updateInvestmentProjection(): void {
    let investmentprojectionforupdatedto: investmentprojectionforupdate = new investmentprojectionforupdate();

    investmentprojectionforupdatedto.id = this.investProjectionStockFactory.id;
    investmentprojectionforupdatedto.userId = this.investProjectionStockFactory.userId;
    investmentprojectionforupdatedto.projectionName = this.investProjectionStockFactory.projectionName;
    investmentprojectionforupdatedto.repeatInvestmentAmount = Number(this.investProjectionStockFactory.repeatInvestmentAmount);
    investmentprojectionforupdatedto.repeatInvestmentFrequency = Number(this.investProjectionStockFactory.repeatInvestmentFrequency);
    investmentprojectionforupdatedto.purchaseFrequency = Number(this.investProjectionStockFactory.purchaseFrequency);
    investmentprojectionforupdatedto.yearRangeLow = Number(this.investProjectionStockFactory.yearRangeLow);
    investmentprojectionforupdatedto.yearRangeHigh = Number(this.investProjectionStockFactory.yearRangeHigh);
    investmentprojectionforupdatedto.securities = [];

    let projStockCount = this.investProjectionStockFactory.investProjectionStocks.length;
    for (var i = 0; i < projStockCount; i++) {
      investmentprojectionforupdatedto.securities.push(this.investProjectionStockFactory.investProjectionStocks[i].securityRecord);
    }


    this.prefSecurityService.updateInvestmentProjection(investmentprojectionforupdatedto).subscribe(prefsecurities => {

    });

  }
  newCalculation(): void {

    this.investProjectionStockFactory = new InvestProjectionStockFactory();

  }


  deleteCalculations(): void {
    let investmentProjectionId: number = this.investProjectionStockFactory.id;
    if (investmentProjectionId > 0) {
      this.prefSecurityService.deleteInvestmentProjection(investmentProjectionId).subscribe(security => {
        this.investProjectionStockFactory = new InvestProjectionStockFactory();

        let index = this.investProjectionStockFactoryList.findIndex(x => x.id === investmentProjectionId);
        if (index > -1) {
          this.investProjectionStockFactoryList.splice(index, 1);
        }


      });
    } else {
      this.investProjectionStockFactory = new InvestProjectionStockFactory();
    }

    
  }

  saveCalculations(): void {

    if (this.investProjectionStockFactory.id > 0) {
      this.updateInvestmentProjection();
    } else {
      this.newInvestmentProjection();
    }
   
  }
  addSecurity(securityId: number): void {
    this.prefSecurityService.getSecurity(securityId)
      .subscribe(security => {
        this.setSecurityId(security);
      });
  }

  refreshCalculations(): void {

    if (this.investProjectionStockFactory.investProjectionStocks.length == 0) {
      alert("Select A Security");
      return;
    }
    

    this.UpdateStockPrices();
    
    
    
  }


  removeStock(securityId: number) {
    let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === securityId);
    if (index > -1) {
        this.investProjectionStockFactory.investProjectionStocks.splice(index, 1);
    }

  }
  RetrieveStockData(securityId: number): void{
    this.prefSecurityService.getDividends(securityId).subscribe(dividends => {
      //this.dividends = dividends;
      let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === securityId);
      if (index > -1) {
        this.investProjectionStockFactory.investProjectionStocks[index].dividends = dividends;
        this.getHistoricalPrices(securityId);
      }

      
    });
}
  
  setSecurityId(security: Security) {
   // this.securityId = security.id;

    let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === security.id);
    if (index == -1) {


      let investProjectionStock: InvestProjectionStock = new InvestProjectionStock();
      investProjectionStock.securityRecord = security;

      this.investProjectionStockFactory.investProjectionStocks.push(investProjectionStock);
      this.RetrieveStockData(security.id);
     
    }
    // this.modalClose.nativeElement.click();
    
  }

  getHistoricalPrices(securityId: number): void {

   
    let historyDays: number = 365 * 10;
    this.prefSecurityService.getHistoricalPrices(Number(securityId), historyDays)
      .subscribe(historicalPrices => {
        //this.historicalPrices = historicalPrices;
        //this.historicalPrices = historicalPrices;
        let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === securityId);
        if (index > -1) {
          this.investProjectionStockFactory.investProjectionStocks[index].historicalPrices = historicalPrices;
          this.investProjectionStockFactory.investProjectionStocks[index].historicalPrices.sort((a, b) => new Date(a.historicDate).getTime() - new Date(b.historicDate).getTime());
          this.investProjectionStockFactory.investProjectionStocks[index].getTodayAverageGainsFromPastYears();

          this.prefSecurityService.GetPeakRangeDetails(this.investProjectionStockFactory.investProjectionStocks[index].securityRecord.id).subscribe(peakRangeDetails => {
            this.investProjectionStockFactory.investProjectionStocks[index].peakRanges = peakRangeDetails;
          });

          this.prefSecurityService.GetCurrentPeakRanges(this.investProjectionStockFactory.investProjectionStocks[index].securityRecord.id).subscribe(currentPeakRanges => {
            if (currentPeakRanges.length > 0) {
              this.investProjectionStockFactory.investProjectionStocks[index].currentPeakRange = currentPeakRanges[0];
            }
          });

          this.UpdateStockPrices();
        }
       


      }
        , error => {
          console.error(error)
        }

      );
  }


  UpdateStockPrices(): void {
    let stockCount: number = this.investProjectionStockFactory.investProjectionStocks.length;
    for (var i = 0; i < stockCount; i++) {
      this.investProjectionStockFactory.SetupInvestmentProjections(this.investProjectionStockFactory.investProjectionStocks[i]);
      this.investProjectionStockFactory.GetPrices(i);

    
      //this.GetPrices(this.investProjectionStockFactory.investProjectionStocks[i]);
    }

   this.investProjectionStockFactory.priceFractionalCost();

    for (var i = 0; i < stockCount; i++) {

     this.investProjectionStockFactory.ResetShares(this.investProjectionStockFactory.investProjectionStocks[i]);

      
      this.investProjectionStockFactory.investProjectionStocks[i].priorCost = 0;
      this.investProjectionStockFactory.UpdateFractionalPrices(i);
      //this.GetPrices(this.investProjectionStockFactory.investProjectionStocks[i]);
      this.investProjectionStockFactory.investProjectionStocks[i].setNextPurchasePrices();
      this.investProjectionStockFactory.investProjectionStocks[i].setNextDate(this.investProjectionStockFactory.purchaseFrequency);

    

      
      
      
      


      //this.investProjectionStockFactory.investProjectionStocks[i].calculatePeaks( this.prefSecurityService);
      
      
    }

    

    

  }
  
}
