import { Component, OnInit, Input } from '@angular/core';
import { StockPurchaseOption } from '../../../interfaces/StockPurchaseOption';

@Component({
  selector: 'app-spo-sec-pur-stat',
  templateUrl: './spo-sec-pur-stat.component.html',
  styleUrls: ['./spo-sec-pur-stat.component.css']
})
export class SpoSecPurStatComponent implements OnInit {
  @Input() stockPurchaseOption: StockPurchaseOption;
  @Input() purOptionTabNum: number;
  constructor() { }

  ngOnInit() {
  }

}
