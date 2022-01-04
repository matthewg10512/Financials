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
  constructor(private securityService: SecurityService) { }

  ngOnInit() {

    this.processStockPurchaseOptions();

  }


  processStockPurchaseOptions(): void {

    this.securityService.getStockPurchaseOptions(this.stockPurchaseOptResourceParams).subscribe(stockPurchaseOptions => {
      this.stockPurchaseOptions = stockPurchaseOptions;
    });
    


  }

}
