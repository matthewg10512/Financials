import { Component, OnInit, Input } from '@angular/core';
import { StockPurchaseOptionsResourceParameters } from '../../../interfaces/resourceparameters/StockPurchaseOptionsResourceParameters';
import { SecurityService } from '../../../services/security.service';
import { StockPurchaseOption } from '../../../interfaces/StockPurchaseOption';

@Component({
  selector: 'app-stock-purchase-option',
  templateUrl: './stock-purchase-option.component.html',
  styleUrls: ['./stock-purchase-option.component.css']
})
export class StockPurchaseOptionComponent implements OnInit {
  
  private stockPurchaseOptions: StockPurchaseOption[];
  @Input() stockPurchaseOptResourceParams: StockPurchaseOptionsResourceParameters;
  @Input() purOptionTabNum: number;
  sortNameDesc = false;
  sortPercentDesc = false;
  sortPercentCurPerFromHigh = false;
  constructor(private securityService: SecurityService) { }

  ngOnInit() {

    this.processStockPurchaseOptions();

  }


  processStockPurchaseOptions(): void {
    this.stockPurchaseOptions = null;
    this.securityService.getStockPurchaseOptions(this.stockPurchaseOptResourceParams).subscribe(stockPurchaseOptions => {
      this.stockPurchaseOptions = stockPurchaseOptions;

      var purchaseOptionsCount = this.stockPurchaseOptions.length;
      for (var i = 0; i < purchaseOptionsCount; i++) {
        this.stockPurchaseOptions[i].peakRangeDetail.sort((a, b) => Number(a.rangeName.substring(0, 2).replace('%', '')) - Number(b.rangeName.substring(0, 2).replace('%', '')));
      }
    });
    


  }

  sortByPercentage (): void {
    if (!this.sortPercentDesc) {
      this.stockPurchaseOptions.sort((a, b) => a.security.percentageChange - b.security.percentageChange);
    }
    else {
      this.stockPurchaseOptions.sort((a, b) => b.security.percentageChange - a.security.percentageChange);
    }
    this.sortPercentDesc = !this.sortPercentDesc;
  }
  sortByName(): void {
    if (!this.sortNameDesc) {
      this.stockPurchaseOptions.sort((a, b) => a.security.name.localeCompare(b.security.name));
    }
    else {
      this.stockPurchaseOptions.sort((a, b) => b.security.name.localeCompare(a.security.name));
    }
    this.sortNameDesc = !this.sortNameDesc;
  }


  sortByCurPerFromHigh(): void {
    if (!this.sortPercentCurPerFromHigh) {
      this.stockPurchaseOptions.sort((a, b) => ((a.security.currentPrice - a.currentPeakRange.lastOpenHigh) / a.currentPeakRange.lastOpenHigh )
        -
        ((b.security.currentPrice - b.currentPeakRange.lastOpenHigh) / b.currentPeakRange.lastOpenHigh)
      );
    }
    else {
      this.stockPurchaseOptions.sort((a, b) => ((b.security.currentPrice - b.currentPeakRange.lastOpenHigh) / b.currentPeakRange.lastOpenHigh)
        -
        ((a.security.currentPrice - a.currentPeakRange.lastOpenHigh) / a.currentPeakRange.lastOpenHigh)
      );
    }
    this.sortPercentCurPerFromHigh = !this.sortPercentCurPerFromHigh;
  }
}
