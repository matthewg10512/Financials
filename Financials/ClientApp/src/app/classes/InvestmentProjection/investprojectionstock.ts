import { InvestProjection } from "./investprojection";
import { Security } from "../../interfaces/security";
import { HistoricalPrice } from "../../interfaces/historicalprice";
import { Dividend } from "../../interfaces/dividend";
import { PeakRangeDetail } from "../../interfaces/peakrangedetail";
import { CurrentPeakRange } from "../../interfaces/currentpeakranges";

export class InvestProjectionStock {
  priorCost: number;
  investProjections: InvestProjection[];
  securityRecord: Security;
  historicalPrices: HistoricalPrice[];
  dividends: Dividend[];
  priceFind: number[];
  priceCount: number;
  averageRisePrice: number;
  peakRanges: PeakRangeDetail[];
  currentPeakRange: CurrentPeakRange;

  peakRangeCurrentPercentage: number;

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

  

  setNextDate(purchaseFrequency): void {

    var investProjectionLength = this.investProjections.length;
    for (var i = 0; i < investProjectionLength; i++) {
      this.investProjections[i].calculateNextDate(purchaseFrequency);
    }
    

  }

  calculatePeaks(): void {
    this.peakRanges = [];


    this.peakRanges
    this.currentPeakRange = new CurrentPeakRange();



    /*
    let localPeakRanges: PeakRangeDetail[] = [];

    //  rangeName: string;
    // rangeCount: number;

    let rangeStart: Date;
    var historicPrices = this.historicalPrices.length;
    if (historicPrices == 0) {
      return;
    }
    var highRange = 0;
    var lowRange = 0;
    for (var i = 0; i < historicPrices; i++) {
      if (this.historicalPrices[i].open > highRange) {

        if (highRange != 0 && highRange != lowRange) {
          var percentLevel = (highRange - lowRange) / highRange;
          if (percentLevel > .009) {




            var newRange = new Date(this.historicalPrices[i].historicDate);

            var daysRange = (newRange.getTime() - rangeStart.getTime()) / (1000 * 3600 * 24);


            let percentRanking: number = Math.floor((percentLevel * 100) / 5)
            if (localPeakRanges[percentRanking]) {
              let peakrangedetails: PeakRangeDetail = localPeakRanges[percentRanking];
              peakrangedetails.rangeLength += daysRange;
              if (peakrangedetails.maxRangeLength < daysRange) {
                peakrangedetails.maxRangeLength = daysRange;
              }
              peakrangedetails.rangeCount += 1;
              localPeakRanges[percentRanking] = peakrangedetails;
            } else {
              let peakrangedetails: PeakRangeDetail = new PeakRangeDetail();
              peakrangedetails.rangeName = (percentRanking * 5).toString() + '% - ' + ((percentRanking * 5) + 4.99).toFixed(2).toString() + '%'
              peakrangedetails.rangeLength = daysRange;
              peakrangedetails.maxRangeLength = daysRange;
              peakrangedetails.rangeCount = 1;
              localPeakRanges[percentRanking] = peakrangedetails;
            }

            // this.peakRanges.push(percentLevel);
          }

        }
        rangeStart = new Date(this.historicalPrices[i].historicDate);
        highRange = this.historicalPrices[i].open;
        lowRange = this.historicalPrices[i].open;
      }
      if (this.historicalPrices[i].open < lowRange) {
        lowRange = this.historicalPrices[i].open;
      }
    }

*/
    
    /*
    var newRange = new Date(this.historicalPrices[historicPrices-1].historicDate);

    var daysRange = (newRange.getTime() - rangeStart.getTime()) / (1000 * 3600 * 24);
    this.currentPeakRange.rangeLength = daysRange;
    var percentLevelSet = (highRange - lowRange) / highRange;
    let percentRankingSet: number = Math.floor((percentLevelSet * 100) / 5);
    this.currentPeakRange.rangeName = (percentRankingSet * 5).toString() + '% - ' + ((percentRankingSet * 5) + 4.99).toFixed(2).toString() + '%';
    this.peakRangeCurrentPercentage = ((highRange - this.securityRecord.currentPrice) / highRange) * 100;
    */
    /*
    var peakRangeCount = localPeakRanges.length;
    for (var i = 0; i < peakRangeCount; i++) {

      if (localPeakRanges[i]) {
        this.peakRanges.push(localPeakRanges[i]);
      }
    }
    */
    

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
