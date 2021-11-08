import { InvestProjection } from "./investprojection";
import { Dividend } from "../../interfaces/dividend";
import { InvestProjectionStock } from "./investprojectionstock";
import { Security } from "../../interfaces/security";

export class InvestProjectionStockFactory {
  userId: number;

  investProjectionStocks: InvestProjectionStock[];
  repeatInvestmentAmount: number;
  repeatInvestmentFrequency: number;
  yearRangeLow: number;
  yearRangeHigh: number;
  purchaseFrequency: number;
  securities: Security[];
  projectionName: string;
  id: number;


  constructor() {
    this.investProjectionStocks = [];
    this.repeatInvestmentAmount = 10000;
    this.repeatInvestmentFrequency = 1;
    this.purchaseFrequency = 5;
    this.yearRangeLow = 2015;
    this.yearRangeHigh = new Date().getFullYear();
    this.userId = 1;
  }




  priceFractionalCost() {


    if (Number(this.repeatInvestmentAmount) == 0) {
      return;
    }
    var yearReport = 2010;
    var totalStocks = this.investProjectionStocks.length;
    if (totalStocks == 0) {
      return;
    }
    let splitInvest: number = this.repeatInvestmentAmount / totalStocks;

    var totalProjections = this.investProjectionStocks[0].investProjections.length;
    for (var iYear = yearReport; iYear <= 2021; iYear++) {
      for (var i2 = 0; i2 < totalProjections; i2++) {
        var totalPurchaseYear = 0;
        for (var i = 0; i < totalStocks; i++) {


          let index = this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount.findIndex(x => x.year === iYear);
          if (index > -1) {
            totalPurchaseYear += this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].totalPurchase();
          }
        }
        if (this.repeatInvestmentAmount > totalPurchaseYear) {
          continue;
        }
        for (var i = 0; i < totalStocks; i++) {

          let index = this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount.findIndex(x => x.year === iYear);
          if (index > -1) {


            var diffValue = this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].totalPurchase() - splitInvest;

            var percentDrop = (this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].totalPurchase() - diffValue) / this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].totalPurchase();
            this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].percentageShares = percentDrop;



            //this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].sharePurchaseHistory = [];//.length;
            //for (var ipurchase = 0; ipurchase < purchaseCount; ipurchase++) {
            //  this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].sharePurchaseHistory[ipurchase].purchaseAmount = this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].sharePurchaseHistory[ipurchase].purchaseAmount * percentDrop;
            //this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].sharePurchaseHistory[ipurchase].shares = this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].sharePurchaseHistory[ipurchase].shares * percentDrop;



            //}


            // this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].dividendProfit = this.investProjectionStocks[i].investProjections[i2].purchaseYearlyAmount[index].dividendProfit * percentDrop;

          }




        }


      }
    }
  }


  ResetShares(investProjectionStock: InvestProjectionStock): void {

    var investProjLength = investProjectionStock.investProjections.length;
    for (var i = 0; i < investProjLength; i++) {
      var yearlyCount = investProjectionStock.investProjections[i].purchaseYearlyAmount.length
      for (var iYear = 0; iYear < yearlyCount; iYear++) {
        investProjectionStock.investProjections[i].purchaseYearlyAmount[iYear].sharePurchaseHistory = [];
      }
    }
  }
  //investProjectionStock: InvestProjectionStock
  GetPrices(iRec: number): void {
    //var historicPriceCount = this.historicalPrices.length;
    var historicPriceCount = this.investProjectionStocks[iRec].historicalPrices.length;

    
    let purchaseCounter: number = 0;

    let investProjectionCount: number = this.investProjectionStocks[iRec].investProjections.length;

    for (var i = 0; i < historicPriceCount; i++) {
      let currentDayTrade = new Date(this.investProjectionStocks[iRec].historicalPrices[i].historicDate);
      let currentYear = currentDayTrade.getFullYear();

      

      if (currentYear >= Number(this.yearRangeLow) && currentYear <= Number(this.yearRangeHigh)) {
        if (purchaseCounter >= this.purchaseFrequency) {
          purchaseCounter = 0;
        }

        if (purchaseCounter == 0) {

          

          if (this.investProjectionStocks[iRec].historicalPrices[i].open > this.investProjectionStocks[iRec].priorCost) {
            this.investProjectionStocks[iRec].priorCost = this.investProjectionStocks[iRec].historicalPrices[i].open;
            // currentPurchaseAmount = 1;
            // currentPurchaseAmountPercent = 1;
            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjectionStocks[iRec].investProjections[i2].currentPurchaseShares = 1;
              this.investProjectionStocks[iRec].investProjections[i2].AddShares(this.investProjectionStocks[iRec].priorCost, currentDayTrade);
            }
          }
          else {
            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjectionStocks[iRec].investProjections[i2].calculateShares(this.investProjectionStocks[iRec].priorCost, this.investProjectionStocks[iRec].historicalPrices[i].open, currentDayTrade);
            }
          }
        }
        purchaseCounter += 1;

      }


    }

  }

  DetermineAverageGain(): void {
    var investStocks = this.investProjectionStocks.length;
    for (var i = 0; i < investStocks; i++) {
      this.investProjectionStocks[i].getTodayAverageGainsFromPastYears();
    }
  }


  UpdateFractionalPrices(iRec: number): void {

    var historicPriceCount = this.investProjectionStocks[iRec].historicalPrices.length;




    
    let purchaseCounter: number = 0;

    let investProjectionCount: number = this.investProjectionStocks[iRec].investProjections.length;

    for (var i = 0; i < historicPriceCount; i++) {

      let currentDayTrade = new Date(this.investProjectionStocks[iRec].historicalPrices[i].historicDate);
      let currentYear = currentDayTrade.getFullYear();

      if (currentYear >= Number(this.yearRangeLow) && currentYear <= Number(this.yearRangeHigh)) {
        if (purchaseCounter >= this.purchaseFrequency) {
          purchaseCounter = 0;
        }

        if (purchaseCounter == 0) {

          if (this.investProjectionStocks[iRec].historicalPrices[i].open > this.investProjectionStocks[iRec].priorCost) {
            this.investProjectionStocks[iRec].priorCost = this.investProjectionStocks[iRec].historicalPrices[i].open;
            // currentPurchaseAmount = 1;
            // currentPurchaseAmountPercent = 1;
            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjectionStocks[iRec].investProjections[i2].currentPurchaseShares = 1;
              this.investProjectionStocks[iRec].investProjections[i2].AddFractionalShares(this.investProjectionStocks[iRec].priorCost, currentDayTrade);
            }
          }
          else {

            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjectionStocks[iRec].investProjections[i2].calculateFractionalShares(this.investProjectionStocks[iRec].priorCost, this.investProjectionStocks[iRec].historicalPrices[i].open, currentDayTrade);
            }
          }



        }

        purchaseCounter += 1;

      }

      if (this.investProjectionStocks[iRec].dividends.length > 0) {
        let index = this.investProjectionStocks[iRec].dividends.findIndex(x => x.payableDate === this.investProjectionStocks[iRec].historicalPrices[i].historicDate);
        if (index > -1) {
          let dividend: Dividend = this.investProjectionStocks[iRec].dividends[index];
          for (var i2 = 0; i2 < investProjectionCount; i2++) {
            this.investProjectionStocks[iRec].investProjections[i2].AddDividends(dividend.amount, currentYear);
          }
        }
      }



    }
  }




  SetupInvestmentProjections(investProjectionStock: InvestProjectionStock): void {
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
    investProjectionStock.priorCost = 0;



  }


}
