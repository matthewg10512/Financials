import { Component, OnInit, Input } from '@angular/core';
import { InvestProjectionStock } from '../../../classes/InvestmentProjection/investprojectionstock';
import { InvestProjection } from '../../../classes/InvestmentProjection/investprojection';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  @Input() investProjectionStock: InvestProjectionStock;
  @Input() investProjection: InvestProjection;
  constructor() { }

  ngOnInit() {
  }

}
