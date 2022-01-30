import { InvestProjection } from "./investprojection";
import { Dividend } from "../../interfaces/dividend";
import { InvestProjectionStock } from "./investprojectionstock";
import { Security } from "../../interfaces/security";
import { InvestProjectionModel } from "./InvestProjectionModel";

export class InvestProjectionStockFactory {
  userId: number;

  investProjectionStocks: InvestProjectionStock[];


  investProjectionModel: InvestProjectionModel;

  //securities: Security[];
  
  


  constructor() {
    this.investProjectionStocks = [];
    this.investProjectionModel = new InvestProjectionModel();
    
    this.userId = 1;
  }





  UpdateStockPrices(): void {
    var investStocks = this.investProjectionStocks.length;
    for (var i = 0; i < investStocks; i++) {
      this.investProjectionStocks[i].UpdateStockPrices();
    }
  }


 

  DetermineAverageGain(): void {
    var investStocks = this.investProjectionStocks.length;
    for (var i = 0; i < investStocks; i++) {
      this.investProjectionStocks[i].getTodayAverageGainsFromPastYears();
    }
  }






}
