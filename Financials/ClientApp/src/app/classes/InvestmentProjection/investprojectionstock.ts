import { InvestProjection } from "./investprojection";
import { Security } from "../../interfaces/security";
import { HistoricalPrice } from "../../interfaces/historicalprice";
import { Dividend } from "../../interfaces/dividend";

export class InvestProjectionStock {
  priorCost: number;
  investProjections: InvestProjection[];
  securityRecord: Security;
  historicalPrices: HistoricalPrice[];
  dividends: Dividend[];
  priceFind: number[];
  priceCount: number;
  averageRisePrice: number;



  constructor() {
    this.historicalPrices = [];
    this.dividends = [];
    this.investProjections = [];
    this.priceFind = [];
    this.priceCount = 0;
  }



//  {{investProjectionStock.securityRecord.currentPrice}}

//{{investProjectionStock.priorCost}}

  getCurrentPercentageChange(): number {
    var percentage = ((this.priorCost - this.securityRecord.currentPrice) / this.priorCost) * 100
    if (percentage < 0) {
      percentage = 0;
    }

    return percentage;
  }

  

  setNextDate(): void {

    var investProjectionLength = this.investProjections.length;
    for (var i = 0; i < investProjectionLength; i++) {
      this.investProjections[i].calculateNextDate();
    }
    

  }

  setNextPurchasePrices(): void {

    var investProjectionLength = this.investProjections.length;
    for (var i = 0; i < investProjectionLength; i++) {
      var yearlyAmountCount = this.investProjections[i].purchaseYearlyAmount.length;
      for (var i2 = yearlyAmountCount - 1; i2 >= 0; i2--) {
        if (this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase() != 0) {
          var totalPurchase = this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase();
          var potentialFutureValue = this.getPotentialFutureValue();
          this.investProjections[i].recommendYearlyShare = totalPurchase / potentialFutureValue;
          break;
        }
      }

      this.investProjections[i].calculateNewShares(this.getCurrentPercentageChange());

    }


  }

  //Matt jump back on this
  getNextPurchasePrice(): number {
    var investProjectionLength = this.investProjections.length
    if (investProjectionLength == 0) {
      return 0;
    }
    if (this.investProjections[investProjectionLength - 1].purchaseYearlyAmount) {

      var yearlyAmount = this.investProjections[investProjectionLength - 1].purchaseYearlyAmount.length
      if (yearlyAmount == 0) { return 0;}
      return this.investProjections[investProjectionLength - 1].purchaseYearlyAmount[yearlyAmount - 1].totalPurchase() / this.getPotentialFutureValue();
    }
    else {
      return 0;
    }

   



  }


  getNextYear(): string {
    var curDate = new Date();
    curDate.setDate(curDate.getDate() + 365);
    return curDate.toDateString();
  }

  getPotentialFutureValue(): number {


    return this.securityRecord.currentPrice + ((this.securityRecord.currentPrice * this.averageRisePrice) / 100);
  }

  getTodayAverageGainsFromPastYears(): void {
    var currentDate = new Date()

    let historicalPriceCount = this.historicalPrices.length;
    this.priceFind = [];
    this.priceCount = 0;
    for (var i = 0; i < historicalPriceCount; i++) {


      var dayRange = Math.floor(currentDate.getTime() - new Date(this.historicalPrices[i].historicDate).getTime() / (60 * 24 * 60 * 1000)) % 365;

      if (dayRange < 5) {
        this.priceFind.push(this.historicalPrices[i].open);
        i += 5;
        this.priceCount += 1;

        
      }

     // currentDate

        //(new Date() - thisYear) / (60 * 24 * 60 * 1000) % 365

    }

    let priceFindCount: number = this.priceFind.length
    let priceAverageCount:number=0;
    let priceAverageTotal: number=0;
    for (var i = 1; i < priceFindCount; i++) {
      var averageMove = ((this.priceFind[i] - this.priceFind[i - 1]) / this.priceFind[i-1]) * 100
      priceAverageTotal += averageMove;
      priceAverageCount += 1;

    }

    this.averageRisePrice = Math.floor(priceAverageTotal / priceAverageCount);
  }


}
