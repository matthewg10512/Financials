import { SharePurchaseHistory } from "./sharepurchasehistory";

export class purchaseYearly {
  year: number;
  percentageShares: number;
  //shares: number;
  //purchaseAmount: number;


  dividendProfit: number; //amount of dividend from stock
  sharePurchaseHistory: SharePurchaseHistory[];
  GetAverageCost(): number {
    return this.totalPurchase() / this.totalShares();

  }

  constructor() {
    this.sharePurchaseHistory = [];
    this.percentageShares = 1;
    this.dividendProfit = 0;
  }


  totalShares(): number {
    let shareAmount: number = 0;
    let shareCount = this.sharePurchaseHistory.length;
    for (var i = 0; i < shareCount; i++) {
      shareAmount += this.sharePurchaseHistory[i].shares;
    }
    return shareAmount;
  }


  totalPurchase(): number {
    let shareAmount: number = 0;
    let shareCount = this.sharePurchaseHistory.length;
    for (var i = 0; i < shareCount; i++) {
      shareAmount += this.sharePurchaseHistory[i].purchaseAmount;
    }
    return shareAmount;
  }


}
