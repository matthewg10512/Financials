import { Component, OnInit, Input } from '@angular/core';
import { StockPurchaseOption } from '../../../interfaces/StockPurchaseOption';

@Component({
  selector: 'app-spo-invest-projection',
  templateUrl: './spo-invest-projection.component.html',
  styleUrls: ['./spo-invest-projection.component.css']
})
export class SpoInvestProjectionComponent implements OnInit {
  @Input() stockPurchaseOption: StockPurchaseOption;
  @Input() purOptionTabNum: number;
  constructor() { }

  ngOnInit() {
  }

}
