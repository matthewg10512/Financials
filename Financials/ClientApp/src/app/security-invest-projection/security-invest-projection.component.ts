import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { HistoricalPrice } from '../interfaces/historicalprice';
import { Security } from '../interfaces/security';
import { Dividend } from '../interfaces/dividend';
import { InvestProjection, InvestProjectionStock, InvestProjectionStockFactory } from '../interfaces/investprojection';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-security-invest-projection',
  templateUrl: './security-invest-projection.component.html',
  styleUrls: ['./security-invest-projection.component.css']

})

export class SecurityInvestProjectionComponent implements OnInit {
  currentActionItem = 'populatesecurityid';


  investProjectionStockFactory: InvestProjectionStockFactory;
  //investProjectionStocks: InvestProjectionStock[];

 // investProjections: InvestProjection[];
  @ViewChild('myModalClose', { static: false }) modalClose;

  securityRecord: Security;
  //numberOfShares: number = 0;
  //purchaseAmount: number = 0;
  //dividendProfit: number = 0;
  yearLow: number = 2015;
  yearHigh: number= 2021;
  //numberOfSharesPercent: number = 0;
  //dividendProfitPercent: number = 0;
  //purchaseAmountPercent: number = 0;
 // totalYearlyInvestment: number = 10000;

 // securityId: number;

  constructor(
    private prefSecurityService: SecurityService) {

    
    this.investProjectionStockFactory = new InvestProjectionStockFactory();
  }

  ngOnInit() {

    //this.getHistoricalPrices();
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
    this.prefSecurityService.getDividends(this.securityRecord.id).subscribe(dividends => {
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
    this.securityRecord = security;

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
      this.GetPrices(this.investProjectionStockFactory.investProjectionStocks[i]);







    }

   this.investProjectionStockFactory.priceFractionalCost();

  }

  GetPrices(investProjectionStock: InvestProjectionStock): void {
  //var historicPriceCount = this.historicalPrices.length;
    var historicPriceCount = investProjectionStock.historicalPrices.length;
    

  investProjectionStock.investProjections = [];
  let investProjectionNormal: InvestProjection = new InvestProjection();
  investProjectionNormal.projectionTypeId = 0;
  investProjectionNormal.projectionType = 'Normal Purchases';
  investProjectionStock.investProjections.push(investProjectionNormal);

  let investProjectionProgress: InvestProjection = new InvestProjection();
  investProjectionProgress.projectionTypeId = 1;
  investProjectionProgress.projectionType = 'Progressive Purchases';
  investProjectionStock.investProjections.push(investProjectionProgress);

  let investProjectionPercentage: InvestProjection = new InvestProjection();
  investProjectionPercentage.projectionTypeId = 2;
  investProjectionPercentage.projectionType = 'Progressive Percentage';
  investProjectionStock.investProjections.push(investProjectionPercentage);

  let investProjectionAgressive: InvestProjection = new InvestProjection();
  investProjectionAgressive.projectionTypeId = 3;
  investProjectionAgressive.projectionType = 'Aggressive Percentage';
  investProjectionStock.investProjections.push(investProjectionAgressive);


  /*
  this.dividendProfit = 0;
  this.dividendProfitPercent = 0;

  this.numberOfShares = 0;
  this.purchaseAmount = 0;

  this.numberOfSharesPercent = 0;
  this.purchaseAmountPercent = 0;
  */

  //let currentPurchaseAmount: number = 1;

  //let currentPurchaseAmountPercent: number = 1;

    investProjectionStock.priorCost = 0;



  let purchaseFrequency: number = 5;
  let purchaseCounter: number = 0;

    let investProjectionCount: number = investProjectionStock.investProjections.length;

  for (var i = 0; i < historicPriceCount; i++) {
    let currentYear = new Date(investProjectionStock.historicalPrices[i].historicDate).getFullYear();

    if (currentYear >= Number(this.yearLow) && currentYear <= Number(this.yearHigh)) {
      if (purchaseCounter > purchaseFrequency) {
        purchaseCounter = 0;
      }
      
      if (purchaseCounter == 0) {



        if (investProjectionStock.historicalPrices[i].open > investProjectionStock.priorCost) {
          investProjectionStock.priorCost = investProjectionStock.historicalPrices[i].open;
         // currentPurchaseAmount = 1;
         // currentPurchaseAmountPercent = 1;
          for (var i2 = 0; i2 < investProjectionCount; i2++) {
            investProjectionStock.investProjections[i2].currentPurchaseShares = 1;
          }
        }
        else {

          for (var i2 = 0; i2 < investProjectionCount; i2++) {
            investProjectionStock.investProjections[i2].calculateShares(investProjectionStock.priorCost, investProjectionStock.historicalPrices[i].open, currentYear);
          }

          /*
          if (currentPurchaseAmount < 5) {
            currentPurchaseAmount += 1;
          }
          let percentDrop: number = Math.floor((
            (priorCost - this.historicalPrices[i].open) / priorCost * 100)
            / 5
          )
          currentPurchaseAmountPercent = 1 + percentDrop;
          */
        }



      //  this.numberOfShares += currentPurchaseAmount;
       // this.purchaseAmount += this.historicalPrices[i].open * currentPurchaseAmount;


        //this.numberOfSharesPercent += currentPurchaseAmountPercent;
        //this.purchaseAmountPercent += this.historicalPrices[i].open * currentPurchaseAmountPercent;
       

      }


     



      purchaseCounter += 1;
     
    }

    if (investProjectionStock.dividends.length > 0) {
      let index = investProjectionStock.dividends.findIndex(x => x.payableDate === investProjectionStock.historicalPrices[i].historicDate);
      if (index > -1) {
        let dividend: Dividend = investProjectionStock.dividends[index];
        for (var i2 = 0; i2 < investProjectionCount; i2++) {
          investProjectionStock.investProjections[i2].AddDividends(dividend.amount, currentYear);
        }
      //  this.dividendProfit += (dividend.amount * this.numberOfShares);
        //this.dividendProfitPercent += (dividend.amount * this.numberOfSharesPercent);
      }
    }



    }

  }


  /*
  GetPrices(): void {
    var historicPriceCount = this.historicalPrices.length;

    this.dividendProfit = 0;
    this.dividendProfitPercent = 0;

    this.numberOfShares = 0;
    this.purchaseAmount = 0;

    this.numberOfSharesPercent = 0;
    this.purchaseAmountPercent = 0;


    let currentPurchaseAmount: number = 1;

    let currentPurchaseAmountPercent: number = 1;

    let currentCost: number = 0;



    let purchaseFrequency: number = 5;
    let purchaseCounter: number = 0;
    for (var i = 0; i < historicPriceCount; i++) {
      let currentYear = new Date(this.historicalPrices[i].historicDate).getFullYear();

      if (currentYear >= Number(this.yearLow) && currentYear <= Number(this.yearHigh)) {
        if (purchaseCounter > purchaseFrequency) {
          purchaseCounter = 0;
        }
        if (this.historicalPrices[i].open > currentCost) {
          currentCost = this.historicalPrices[i].open;
          currentPurchaseAmount = 1;
          currentPurchaseAmountPercent = 1;
        }
        else {
          if (currentPurchaseAmount < 5) {
            currentPurchaseAmount += 1;
          }
          let percentDrop: number = Math.floor((
            (currentCost - this.historicalPrices[i].open) / currentCost * 100)
            / 5
          )
          currentPurchaseAmountPercent = 1 + percentDrop;

        }
        if (purchaseCounter == 0) {
          this.numberOfShares += currentPurchaseAmount;
          this.purchaseAmount += this.historicalPrices[i].open * currentPurchaseAmount;


          this.numberOfSharesPercent += currentPurchaseAmountPercent;
          this.purchaseAmountPercent += this.historicalPrices[i].open * currentPurchaseAmountPercent;
          

        }

   
        



        purchaseCounter += 1;
        
      }

      if (this.dividends.length > 0) {
        let historicDate: string = this.historicalPrices[i].historicDate;
        let index = this.dividends.findIndex(x => x.payableDate === this.historicalPrices[i].historicDate);
        if (index > -1) {
          let dividend: Dividend = this.dividends[index];
          this.dividendProfit += (dividend.amount * this.numberOfShares);
          this.dividendProfitPercent += (dividend.amount * this.numberOfSharesPercent);

        }
      }



      }

    }
  */
}
