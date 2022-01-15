import { Component, OnInit, Input } from '@angular/core';
import { StockPurchaseOption } from '../../../interfaces/StockPurchaseOption';

@Component({
  selector: 'app-spo-sec-detail',
  templateUrl: './spo-sec-detail.component.html',
  styleUrls: ['./spo-sec-detail.component.css']
})
export class SpoSecDetailComponent implements OnInit {
  @Input() stockPurchaseOption: StockPurchaseOption;
  @Input() purOptionTabNum: number;
  constructor() { }

  ngOnInit() {
  }

}
