import { SharePurchaseHistory } from "./sharepurchasehistory";
import { purchaseYearly } from "./purchaseyearly";


export class InvestProjection {
  projectionType: string;
 // numberOfShares: number;  //number of shares purchased

  maxNumberSharePurchase: number;
  recommendYearlyShare: number;
  lastPurchaseDate: Date;
  nextDate: Date;
  recommendCurrentPurchaseLevel: number;


  
 holidays = {
  '11/25/2021': 'Thanksgiving',
  '12/24/2021': 'Christmas Holiday - U.S. (Observed)',
  '1/17/2022': 'Martin Luther King, Jr. Day'
};

  projectionTypeId: number;//projection type 0 is regular, 1 is up to 5 shares, 2 is up to percentage
  purchaseYearlyAmount: purchaseYearly[]

  dividendProfit: number;

  currentPurchaseShares: number;//Current Purchase to make
  constructor() {
    this.currentPurchaseShares = 1;
   // this.numberOfShares = 0;
    this.maxNumberSharePurchase = 0;
    
    this.purchaseYearlyAmount = [];
    this.nextDate = new Date();
  }


  getSharePurchaseRecommend(): number {

    var purchaseYearlyCount = this.purchaseYearlyAmount.length;
    if (purchaseYearlyCount > 0) {
      var priceLevel = []
      for (var i = 0; i < purchaseYearlyCount; i++) {
        var purchaseHistoryLength = this.purchaseYearlyAmount[i].sharePurchaseHistory.length;
        for (var i2 = 0; i2 < purchaseHistoryLength; i2++) {
          var priceShareLevel = this.purchaseYearlyAmount[i].sharePurchaseHistory[i2].sharePurchaseLevel;
          if (priceLevel[priceShareLevel]) {
            priceLevel[priceShareLevel] += 1;
          }
          else {
            priceLevel[priceShareLevel] = 1;
          }
        }

      }

      var purchaseHistoryLen = this.purchaseYearlyAmount[0].sharePurchaseHistory.length;
      var priceLevelCount = priceLevel.length;
      if (priceLevelCount == 2) {
        return this.recommendYearlyShare / purchaseHistoryLen;
      }
      else {
        var maxIndexValue = 1;
        var maxValue = 1;
        for (var i = 2; i < priceLevelCount;i++) {
          if (priceLevel[i] && priceLevel[i] > maxValue) {
            maxIndexValue = i;
            maxValue = priceLevel[i];
          }
        }
        return this.recommendYearlyShare / (maxIndexValue * purchaseHistoryLen);

      }
      /*
      var purchaseHistoryLength = this.purchaseYearlyAmount[0].sharePurchaseHistory.length;
      if (purchaseHistoryLength) {
        return this.recommendYearlyShare / purchaseHistoryLength;
      }
      
      */

    }

    

    return this.recommendYearlyShare;
  }


  calculateNextDate(purchaseFrequency): void {

    if (this.lastPurchaseDate) {

      var getFutureDate = new Date(this.lastPurchaseDate);
      var purchaseCounter = 0;
      while (purchaseCounter < purchaseFrequency) {
        getFutureDate.setDate(getFutureDate.getDate() + 1);
        if (getFutureDate.getDay() != 0 && getFutureDate.getDay() != 6) {
          if (!(this.getHoliday(getFutureDate.getDate(), getFutureDate.getMonth() + 1, getFutureDate.getFullYear()))){
            purchaseCounter += 1;
          }
          else {

          }
        }

      }

      this.nextDate = getFutureDate;
    } 
  }


  getHoliday(month: number, day:number, year: number): string {

    var dateDetail = this.holidays[day + "/" + month + "/" + year]

    return dateDetail;

  }

  


  calculateFractionalShares(priorCost: number, newCost: number, currentDayTrade: Date): void {
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

    this.AddFractionalShares(newCost, currentDayTrade);
  }

  calculateNewShares(percentage: number ): void {
    

    switch (Number(this.projectionTypeId)) {
      case 0:
        this.recommendCurrentPurchaseLevel = 1;
        break;

      case 1:
        this.recommendCurrentPurchaseLevel = this.currentPurchaseShares;
        break;

      case 2:
        let percentDrop: number = Math.floor((percentage / 5));
        this.recommendCurrentPurchaseLevel = 1 + percentDrop;
        break;
      case 3:
        let percentDrop2: number = Math.floor((percentage) / 3);
        this.recommendCurrentPurchaseLevel = 1 + percentDrop2;
        break;
    }

  }


  calculateShares(priorCost: number, newCost: number, currentDayTrade: Date): void {
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

    this.AddShares(newCost, currentDayTrade);
  }
  
  GetAverageCost(): number {
    return this.GetTotalPurchaseAmount() / this.GetTotalShares();
  
  }


  GetTotalDividendProfit(): number {
    let dividendProfit: number = 0;
    let yearCount = this.purchaseYearlyAmount.length;
    for (var i = 0; i < yearCount; i++) {
      dividendProfit += this.purchaseYearlyAmount[i].dividendProfit;
    }
    return dividendProfit;
  }
  

  GetTotalPurchaseAmount(): number {
    let totalPurchase: number = 0;
    let yearCount = this.purchaseYearlyAmount.length;
    for (var i = 0; i < yearCount; i++) {
      totalPurchase += this.purchaseYearlyAmount[i].totalPurchase();
    }
    return totalPurchase;
  }



  GetTotalShares(): number {
    let totalShares: number = 0;
    let yearCount = this.purchaseYearlyAmount.length;
    for (var i = 0; i < yearCount; i++) {
      totalShares += this.purchaseYearlyAmount[i].totalShares();
    }
    return totalShares;
  }


  AddFractionalShares(newCost: number, currentDayTrade: Date): void {

    let currentYear = currentDayTrade.getFullYear();
    let index = this.purchaseYearlyAmount.findIndex(x => x.year === currentYear);
    if (index > -1) {
      let purchaseYearlyNew: purchaseYearly = this.purchaseYearlyAmount[index];

      
      //purchaseYearlyNew.purchaseAmount += newCost * this.currentPurchaseShares;
      //purchaseYearlyNew.shares += this.currentPurchaseShares;
      var perShares = purchaseYearlyNew.percentageShares;

      let sharePurchaseHistory: SharePurchaseHistory = new SharePurchaseHistory();
      sharePurchaseHistory.shares = perShares * this.currentPurchaseShares;
      sharePurchaseHistory.purchaseAmount = perShares * newCost * this.currentPurchaseShares;
      sharePurchaseHistory.purchaseDate = currentDayTrade;
      sharePurchaseHistory.sharePurchaseLevel = this.currentPurchaseShares;
      purchaseYearlyNew.sharePurchaseHistory.push(sharePurchaseHistory);
      
      this.purchaseYearlyAmount[index] = purchaseYearlyNew;
      this.lastPurchaseDate = currentDayTrade;
    }
  

  }
  AddShares(newCost: number, currentDayTrade: Date): void {
    let currentYear = currentDayTrade.getFullYear();
    let index = this.purchaseYearlyAmount.findIndex(x => x.year === currentYear);
    if (index > -1) {
      let purchaseYearlyNew: purchaseYearly = this.purchaseYearlyAmount[index];

      let sharePurchaseHistory: SharePurchaseHistory = new SharePurchaseHistory();
      sharePurchaseHistory.shares = this.currentPurchaseShares;
      sharePurchaseHistory.purchaseAmount = newCost * this.currentPurchaseShares;
      sharePurchaseHistory.purchaseDate = currentDayTrade;
      this.purchaseYearlyAmount[index].sharePurchaseHistory.push(sharePurchaseHistory);

      this.lastPurchaseDate = currentDayTrade;

      this.purchaseYearlyAmount[index] = purchaseYearlyNew;
    }
    else {
      let purchaseYearlyNew: purchaseYearly = new purchaseYearly();
      purchaseYearlyNew.year = currentYear;
      //purchaseYearlyNew.purchaseAmount = newCost * this.currentPurchaseShares;
      //purchaseYearlyNew.shares = this.currentPurchaseShares;

      let sharePurchaseHistory: SharePurchaseHistory = new SharePurchaseHistory();
      sharePurchaseHistory.shares = this.currentPurchaseShares;
      sharePurchaseHistory.purchaseAmount = newCost * this.currentPurchaseShares;
      sharePurchaseHistory.purchaseDate = currentDayTrade;
      sharePurchaseHistory.sharePurchaseLevel = this.currentPurchaseShares;
      purchaseYearlyNew.sharePurchaseHistory = [];
      purchaseYearlyNew.sharePurchaseHistory.push(sharePurchaseHistory)
      this.purchaseYearlyAmount.push(purchaseYearlyNew);

      this.lastPurchaseDate = currentDayTrade;
      


    }

  }

  AddDividends(dividend: number, currentYear: number): void {


    let index = this.purchaseYearlyAmount.findIndex(x => x.year === currentYear);
    if (index > -1) {
      let purchaseYearlyNew: purchaseYearly = this.purchaseYearlyAmount[index];
      purchaseYearlyNew.dividendProfit += dividend * this.GetTotalShares();
      this.purchaseYearlyAmount[index] = purchaseYearlyNew;
    }
    else {
      let purchaseYearlyNew: purchaseYearly = new purchaseYearly();
      purchaseYearlyNew.year = currentYear;
      purchaseYearlyNew.dividendProfit = dividend * this.GetTotalShares()
      //purchaseYearlyNew.purchaseAmount = 0;
      
      //purchaseYearlyNew.shares = 0;
      if (purchaseYearlyNew.dividendProfit) {
        this.purchaseYearlyAmount.push(purchaseYearlyNew);
      }
    }


  }

}
