import { InvestProjection } from "./investprojection";
import { Security } from "../../interfaces/security";
import { HistoricalPrice } from "../../interfaces/historicalprice";
import { Dividend } from "../../interfaces/dividend";
import { PeakRangeDetail } from "../../interfaces/peakrangedetail";
import { CurrentPeakRange } from "../../interfaces/currentpeakranges";
import { SecurityService } from "../../services/security.service";
import { InvestProjectionModel } from "./InvestProjectionModel";

export class InvestProjectionStock {
  priorCost: number;
  investProjections: InvestProjection[];
  selectedinvestProjection: InvestProjection;
  securityRecord: Security;
  historicalPrices: HistoricalPrice[];
  dividends: Dividend[];
  yearlyaAveragePercent: number;
  peakRanges: PeakRangeDetail[];
  currentPeakRange: CurrentPeakRange;
  
  investProjectionModel: InvestProjectionModel;
  constructor(private securityService: SecurityService, _investProjectionModel: InvestProjectionModel) {
    this.historicalPrices = [];
    this.dividends = [];
    this.investProjections = [];
    this.investProjectionModel  = _investProjectionModel;
  }





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



  setNextPurchasePrices(totalPurchase:number): void {

    var investProjectionLength = this.investProjections.length;
    for (var i = 0; i < investProjectionLength; i++) {
      var yearlyAmountCount = this.investProjections[i].purchaseYearlyAmount.length;
      for (var i2 = yearlyAmountCount - 1; i2 >= 0; i2--) {
        if (this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase() != 0) {
          //var totalPurchase = this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase();
          var potentialFutureValue = this.getPotentialFutureValue();
          this.investProjections[i].recommendYearlyShare = totalPurchase / potentialFutureValue;
          break;
        }
      }

      this.investProjections[i].calculateNewShares(this.getCurrentPercentageChange());

    }


  }


  RetrieveStockData(): void {
    
    this.securityService.getDividends(this.securityRecord.id).subscribe(dividends => {
      //this.dividends = dividends;
      //let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === securityId);
      //if (index > -1) {
        this.dividends = dividends;
        this.getHistoricalPrices();
     // }


    });
  }


  getHistoricalPrices(): void {


    let historyDays: number = 365 * 10;
    this.securityService.getHistoricalPrices(Number(this.securityRecord.id), historyDays)
      .subscribe(historicalPrices => {
        //this.historicalPrices = historicalPrices;
        //this.historicalPrices = historicalPrices;
        
          this.historicalPrices = historicalPrices;
          this.historicalPrices.sort((a, b) => new Date(a.historicDate).getTime() - new Date(b.historicDate).getTime());
          this.getTodayAverageGainsFromPastYears();

        this.securityService.GetPeakRangeDetails(this.securityRecord.id).subscribe(peakRangeDetails => {
            this.peakRanges = peakRangeDetails;
          });

        this.securityService.GetCurrentPeakRanges(this.securityRecord.id).subscribe(currentPeakRanges => {
            if (currentPeakRanges.length > 0) {
              this.currentPeakRange = currentPeakRanges[0];
            }
          });

          this.UpdateStockPrices();
        }



      
        , error => {
          console.error(error)
        }

      );
  }



  UpdateStockPrices(): void {
    
    
      this.SetupInvestmentProjections();
      this.GetPrices();


    
    this.priceFractionalCost();

    
      this.ResetShares();


      this.priorCost = 0;
      this.UpdateFractionalPrices();

    let splitInvest: number = this.investProjectionModel.repeatInvestmentAmount / this.investProjectionModel.totalStocks;

      this.setNextPurchasePrices(splitInvest);
      this.setNextDate(this.investProjectionModel.purchaseFrequency);

      this.setProjectionStock();




    





  }


  //investProjectionStock: InvestProjectionStock
  GetPrices(): void {
    //var historicPriceCount = this.historicalPrices.length;
    var historicPriceCount = this.historicalPrices.length;
    let currentMonth: number = 13;

    let purchaseCounter: number = 0;

    let investProjectionCount: number = this.investProjections.length;

    for (var i = 0; i < historicPriceCount; i++) {
      let currentDayTrade = new Date(this.historicalPrices[i].historicDate);
      let currentYear = currentDayTrade.getFullYear();



      if (currentYear >= Number(this.investProjectionModel.yearRangeLow) && currentYear <= Number(this.investProjectionModel.yearRangeHigh)) {
        if (purchaseCounter >= this.investProjectionModel.purchaseFrequency) {
          purchaseCounter = 0;
        }

        //if (purchaseCounter == 0) {
        if (currentMonth != new Date(this.historicalPrices[i].historicDate).getMonth()) {
          currentMonth = new Date(this.historicalPrices[i].historicDate).getMonth();

          if (this.historicalPrices[i].open > this.priorCost) {
            this.priorCost = this.historicalPrices[i].open;
            // currentPurchaseAmount = 1;
            // currentPurchaseAmountPercent = 1;
            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjections[i2].currentPurchaseShares = 1;
              this.investProjections[i2].AddShares(this.priorCost, currentDayTrade);
            }
          }
          else {
            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjections[i2].calculateShares(this.priorCost, this.historicalPrices[i].open, currentDayTrade);
            }
          }
        }
        purchaseCounter += 1;

      }


    }

  }



  ResetShares(): void {

    var investProjLength = this.investProjections.length;
    for (var i = 0; i < investProjLength; i++) {
      var yearlyCount = this.investProjections[i].purchaseYearlyAmount.length
      for (var iYear = 0; iYear < yearlyCount; iYear++) {
        this.investProjections[i].purchaseYearlyAmount[iYear].sharePurchaseHistory = [];
      }
    }
  }



  UpdateFractionalPrices(): void {

    var historicPriceCount = this.historicalPrices.length;

    let currentMonth: number = 13;



    let purchaseCounter: number = 0;

    let investProjectionCount: number = this.investProjections.length;

    for (var i = 0; i < historicPriceCount; i++) {

      let currentDayTrade = new Date(this.historicalPrices[i].historicDate);
      let currentYear = currentDayTrade.getFullYear();

      if (currentYear >= Number(this.investProjectionModel.yearRangeLow) && currentYear <= Number(this.investProjectionModel.yearRangeHigh)) {
        if (purchaseCounter >= this.investProjectionModel.purchaseFrequency) {
          purchaseCounter = 0;
        }

        if (currentMonth != new Date(this.historicalPrices[i].historicDate).getMonth()) {
          currentMonth = new Date(this.historicalPrices[i].historicDate).getMonth();

          if (this.historicalPrices[i].open > this.priorCost) {
            this.priorCost = this.historicalPrices[i].open;
            // currentPurchaseAmount = 1;
            // currentPurchaseAmountPercent = 1;
            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjections[i2].currentPurchaseShares = 1;
              this.investProjections[i2].AddFractionalShares(this.priorCost, currentDayTrade);
            }
          }
          else {

            for (var i2 = 0; i2 < investProjectionCount; i2++) {
              this.investProjections[i2].calculateFractionalShares(this.priorCost, this.historicalPrices[i].open, currentDayTrade);
            }
          }



        }

        purchaseCounter += 1;

      }

      if (this.dividends.length > 0) {
        let index = this.dividends.findIndex(x => x.payableDate === this.historicalPrices[i].historicDate);
        if (index > -1) {
          let dividend: Dividend = this.dividends[index];
          for (var i2 = 0; i2 < investProjectionCount; i2++) {
            this.investProjections[i2].AddDividends(dividend.amount, currentYear);
          }
        }
      }



    }
  }













  priceFractionalCost() {
    var yearlyTrades = 12;//monthly

    if (Number(this.investProjectionModel.repeatInvestmentAmount) == 0) {
      return;
    }
    var yearReport = 2010;
    var totalStocks = this.investProjectionModel.totalStocks;
    if (totalStocks == 0) {
      return;
    }
    let splitInvest: number = this.investProjectionModel.repeatInvestmentAmount / totalStocks;

    var totalProjections = this.investProjections.length;
    for (var iYear = yearReport; iYear <= 2022; iYear++) {

      for (var i2 = 0; i2 < totalProjections; i2++) {
        for (var i = 0; i < totalStocks; i++) {
          let index = this.investProjections[i2].purchaseYearlyAmount.findIndex(x => x.year === iYear);
          if (index > -1) {
            var stockYearlyTotalPur = this.investProjections[i2].purchaseYearlyAmount[index].totalPurchase();
            if (stockYearlyTotalPur == 0) { continue; }
            var fillMissingTrades = yearlyTrades - this.investProjections[i2].purchaseYearlyAmount[index].sharePurchaseHistory.length;
            stockYearlyTotalPur += (stockYearlyTotalPur * fillMissingTrades);
            var percentDifference = Math.abs(1 + (splitInvest - stockYearlyTotalPur) / stockYearlyTotalPur);
            this.investProjections[i2].purchaseYearlyAmount[index].percentageShares = percentDifference;
          }
        }
      }
    }
  }







  //Matt jump back on this
  getNextPurchasePrice(): number {
    var investProjectionLength = this.investProjections.length
    if (investProjectionLength == 0) {
      return 0;
    }
    if (this.investProjections[investProjectionLength - 1].purchaseYearlyAmount) {
      var purchaseYearlyAmount = this.investProjections[investProjectionLength - 1].purchaseYearlyAmount
      var yearlyAmount = this.investProjections[investProjectionLength - 1].purchaseYearlyAmount.length
      if (yearlyAmount == 0) { return 0; }
      var totalPurchase = this.investProjections[investProjectionLength - 1].purchaseYearlyAmount[yearlyAmount - 1].totalPurchase();
      var potentialFutureValue = this.getPotentialFutureValue();
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



  /*Gets the potential value of the stock.  This is based on the current price added by the average rise price percent
   */
  getPotentialFutureValue(): number {
    return this.securityRecord.currentPrice + ((this.securityRecord.currentPrice * this.yearlyaAveragePercent) / 100);
  }

  getTodayAverageGainsFromPastYears(): void {
    var currentDate = new Date()

    let historicalPriceCount = this.historicalPrices.length;
    let yearlyPrices: number[] = [];
    for (var i = 0; i < historicalPriceCount; i++) {
      var dayRange = Math.floor(currentDate.getTime() - new Date(this.historicalPrices[i].historicDate).getTime() / (60 * 24 * 60 * 1000)) % 365;

      if (dayRange < 5) { //meant to retrieve each year open value to get the average
        yearlyPrices.push(this.historicalPrices[i].open);
        i += 5;
      }
    }

    let priceFindCount: number = yearlyPrices.length
    let percentAverageCount:number=0;
    let percentAverageTotal: number=0;
    for (var i = 1; i < priceFindCount; i++) {// gets the average between prior years
      var averageMove = ((yearlyPrices[i] - yearlyPrices[i - 1]) / yearlyPrices[i - 1]) * 100;// the average percentage from one year to the next year
      percentAverageTotal += averageMove;//add the average to the average
      percentAverageCount += 1;

    }

    this.yearlyaAveragePercent = Math.floor(percentAverageTotal / percentAverageCount);
  }



  setProjectionStock(): void {
    this.selectedinvestProjection = this.investProjections[3];
  }



  SetupInvestmentProjections(): void {
    this.investProjections = [];
    let investProjectionNormal: InvestProjection = new InvestProjection();
    investProjectionNormal.projectionTypeId = 0;
    investProjectionNormal.projectionType = 'Normal Purchases';
    this.investProjections.push(investProjectionNormal);

    let investProjectionProgress: InvestProjection = new InvestProjection();
    investProjectionProgress.projectionTypeId = 1;
    investProjectionProgress.projectionType = 'Progressive Purchases';
    this.investProjections.push(investProjectionProgress);

    let investProjectionPercentage: InvestProjection = new InvestProjection();
    investProjectionPercentage.projectionTypeId = 2;
    investProjectionPercentage.projectionType = 'Progressive Percentage';
    this.investProjections.push(investProjectionPercentage);

    let investProjectionAgressive: InvestProjection = new InvestProjection();
    investProjectionAgressive.projectionTypeId = 3;
    investProjectionAgressive.projectionType = 'Aggressive Percentage';
    this.investProjections.push(investProjectionAgressive);

    this.priorCost = 0;



  }

}
