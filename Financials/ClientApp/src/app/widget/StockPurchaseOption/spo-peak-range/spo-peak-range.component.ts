import { Component, OnInit, Input } from '@angular/core';
import { StockPurchaseOption } from '../../../interfaces/StockPurchaseOption';

@Component({
  selector: 'app-spo-peak-range',
  templateUrl: './spo-peak-range.component.html',
  styleUrls: ['./spo-peak-range.component.css']
})
export class SpoPeakRangeComponent implements OnInit {
  @Input() stockPurchaseOption: StockPurchaseOption;
  @Input() purOptionTabNum: number;
  
  constructor() { }

  ngOnInit() {
  }

}
