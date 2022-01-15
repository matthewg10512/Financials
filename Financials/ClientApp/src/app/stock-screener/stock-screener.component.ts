import { Component, OnInit } from '@angular/core';
import { StockPurchaseOptionsResourceParameters } from '../interfaces/resourceparameters/StockPurchaseOptionsResourceParameters';

@Component({
  selector: 'app-stock-screener',
  templateUrl: './stock-screener.component.html',
  styleUrls: ['./stock-screener.component.css']
})
export class StockScreenerComponent implements OnInit {
  public stockScreenerSPO: StockPurchaseOptionsResourceParameters;
  constructor() { }

  ngOnInit() {
    var d = new Date;
    d.setDate(d.getDate() - 1);
    this.stockScreenerSPO = new StockPurchaseOptionsResourceParameters();
    this.stockScreenerSPO.priorPurchaseEstimateSharesRangeLow = "10";
    this.stockScreenerSPO.securityVolumeRangeLow = '100000';
    this.stockScreenerSPO.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    this.stockScreenerSPO.securitypercentChangeRangeHigh = '0';
    this.stockScreenerSPO.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    this.stockScreenerSPO.securityPercentDropperType = 'percent5CurrentPrice';

    /*
     * case "averagedrop50Low":  average drop times 1.50 percent(so -2 become -3) compared to the low for day
                    case "averagedropLow":   average drop compared to the low for day
                    case "percent5Low":   top 5 percent dropppers compared to the low for day
                    case "percent10Low": top 10 percent droppers compared to the low for day
                    case "percent15Low": top 15 percent droppers compared to the low for the day
                    case "averagedrop50CurrentPrice": average drop times 1.50 percent(so -2 become -3) compared to the current price for day
                    case "averagedropCurrentPrice":  average drop compared to the current price for day
                    case "percent5CurrentPrice":   top 5 percent droppers compared to the current price for day
                    case "percent10CurrentPrice":  top 10 percent droppers compared to the current price for day
                    case "percent15CurrentPrice":  top 15 percent droppers compared to the current price for day
                    */

  }

}
