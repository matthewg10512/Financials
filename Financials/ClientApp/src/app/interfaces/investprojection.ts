import { Security } from "./security";
import { HistoricalPrice } from "./historicalprice";
import { Dividend } from "./dividend";

export class purchaseYearly {
  year: number;
  shares: number;
  purchaseAmount: number;
  dividendProfit: number; //amount of dividend from stock

  GetAverageCost(): number {
    return this.purchaseAmount / this.shares;

  }

}


export class InvestProjectionStockFactory {
  investProjectionStocks: InvestProjectionStock[];
  totalYearlyInvestment: number;
  purchaseTotalStockYear: purchaseYearly[];


  investProjectionTotalStock: InvestProjectionStock;

  constructor() {
    this.investProjectionStocks = [];
    this.totalYearlyInvestment = 10000;
    this.investProjectionTotalStock = new InvestProjectionStock();
  }

  priceFractionalCost() {


    if (Number(this.totalYearlyInvestment) == 0) {
      return;
    }
    var yearReport = 2010;
    var totalStocks = this.investProjectionStocks.length;
    if (totalStocks == 0) {
      return;
    }
    let splitInvest: number = this.totalYearlyInvestment / totalStocks;

    var totalProjections = this.investProjectionStocks[0].investProjections.length;
    for (var iYear = yearReport; iYear <= 2021; iYear++) {
      for (var i2 = 0; i2 < totalProjections; i2++) {
        var totalPurchaseYear = 0;
        for (var i = 0; i < totalStocks; i++) {


          let index = this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear.findIndex(x => x.year === iYear);
          if (index > -1) {
            totalPurchaseYear += this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].purchaseAmount;
          }
        }
        if (this.totalYearlyInvestment > totalPurchaseYear) {
          continue;
        }
        for (var i = 0; i < totalStocks; i++) {

          let index = this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear.findIndex(x => x.year === iYear);
          if (index > -1) {


            var diffValue = this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].purchaseAmount - splitInvest;
            
            var percentDrop = (this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].purchaseAmount - diffValue) / this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].purchaseAmount;

            this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].purchaseAmount = this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].purchaseAmount * percentDrop;
            this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].shares = this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].shares * percentDrop;
            this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].dividendProfit = this.investProjectionStocks[i].investProjections[i2].purchaseAmountYear[index].dividendProfit * percentDrop;

          }

          


        }


      }
    }
  }


  



}

export class InvestProjectionStock {
  priorCost: number;
  investProjections: InvestProjection[];
  securityRecord: Security;
  historicalPrices: HistoricalPrice[];
  dividends: Dividend[];
  constructor() {
    this.historicalPrices = [];
    this.dividends = [];
    this.investProjections = [];
  }


}


export class InvestProjection {
  projectionType: string;
 // numberOfShares: number;  //number of shares purchased

  maxNumberSharePurchase: number;


  projectionTypeId: number;//projection type 0 is regular, 1 is up to 5 shares, 2 is up to percentage
  purchaseAmountYear: purchaseYearly[]

  dividendProfit: number;

  currentPurchaseShares: number;//Current Purchase to make
  constructor() {
    this.currentPurchaseShares = 1;
   // this.numberOfShares = 0;
    this.maxNumberSharePurchase = 0;
    
    this.purchaseAmountYear = [];
  }


  calculateFractionalAmount(totalYearlyInvestment: number): void{

    let purchaseYears: number = this.purchaseAmountYear.length
    for (var i = 0; i < purchaseYears; i++) {
      this.purchaseAmountYear[i].purchaseAmount
    }
    

  }

  calculateShares(priorCost: number, newCost: number, currentYear: number): void {
    
      switch (Number(this.projectionTypeId)) {
        case 0:
          this.currentPurchaseShares = 1;
          break;

        case 1:
          if (this.currentPurchaseShares < 5) {
            this.currentPurchaseShares += 1;
          }

          break;

        case 2:
          let percentDrop: number = Math.floor((
            (priorCost - newCost) / priorCost * 100)
            / 5
          )
          this.currentPurchaseShares = 1 + percentDrop;
          break;
        case 3:
          let percentDrop2: number = Math.floor((
            (priorCost - newCost) / priorCost * 100)
            / 3
          )
          this.currentPurchaseShares = 1 + percentDrop2;
          break;


     

    }

    if (this.currentPurchaseShares > this.maxNumberSharePurchase) {
      this.maxNumberSharePurchase = this.currentPurchaseShares;
    }

    this.AddShares(newCost, currentYear);
  }
  
  GetAverageCost(): number {
    return this.GetTotalPurchaseAmount() / this.GetTotalShares();
  
  }


  GetTotalDividendProfit(): number {
    let dividendProfit: number = 0;
    let yearCount = this.purchaseAmountYear.length;
    for (var i = 0; i < yearCount; i++) {
      dividendProfit += this.purchaseAmountYear[i].dividendProfit;
    }
    return dividendProfit;
  }
  

  GetTotalPurchaseAmount(): number {
    let totalPurchase: number = 0;
    let yearCount = this.purchaseAmountYear.length;
    for (var i = 0; i < yearCount; i++) {
      totalPurchase += this.purchaseAmountYear[i].purchaseAmount;
    }
    return totalPurchase;
  }



  GetTotalShares(): number {
    let totalShares: number = 0;
    let yearCount = this.purchaseAmountYear.length;
    for (var i = 0; i < yearCount; i++) {
      totalShares += this.purchaseAmountYear[i].shares;
    }
    return totalShares;
  }

  AddShares(newCost: number, currentYear: number): void {

   // this.numberOfShares += this.currentPurchaseShares;
   // this.purchaseAmount += newCost * this.currentPurchaseShares;


    let index = this.purchaseAmountYear.findIndex(x => x.year === currentYear);
    if (index > -1) {
      let purchaseYearlyNew: purchaseYearly = this.purchaseAmountYear[index];
      purchaseYearlyNew.purchaseAmount += newCost * this.currentPurchaseShares;
      purchaseYearlyNew.shares += this.currentPurchaseShares;
      this.purchaseAmountYear[index] = purchaseYearlyNew;
    }
    else {
      let purchaseYearlyNew: purchaseYearly = new purchaseYearly();
      purchaseYearlyNew.year = currentYear;
      purchaseYearlyNew.purchaseAmount = newCost * this.currentPurchaseShares;
      purchaseYearlyNew.shares = this.currentPurchaseShares;
      purchaseYearlyNew.dividendProfit = 0;
      this.purchaseAmountYear.push(purchaseYearlyNew);
    }

  }

  AddDividends(dividend: number, currentYear: number): void {


    let index = this.purchaseAmountYear.findIndex(x => x.year === currentYear);
    if (index > -1) {
      let purchaseYearlyNew: purchaseYearly = this.purchaseAmountYear[index];
      purchaseYearlyNew.dividendProfit += dividend * this.GetTotalShares();
      this.purchaseAmountYear[index] = purchaseYearlyNew;
    }
    else {
      let purchaseYearlyNew: purchaseYearly = new purchaseYearly();
      purchaseYearlyNew.year = currentYear;
      purchaseYearlyNew.dividendProfit = dividend * this.GetTotalShares()
      purchaseYearlyNew.purchaseAmount = 0;
      purchaseYearlyNew.shares = 0;
      if (purchaseYearlyNew.dividendProfit) {
        this.purchaseAmountYear.push(purchaseYearlyNew);
      }
    }


  }

}
