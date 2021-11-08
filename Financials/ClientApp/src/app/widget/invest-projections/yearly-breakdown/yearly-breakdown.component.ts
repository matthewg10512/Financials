import { Component, OnInit, Input } from '@angular/core';
import { InvestProjectionStock } from '../../../classes/InvestmentProjection/investprojectionstock';
import { InvestProjection } from '../../../classes/InvestmentProjection/investprojection';

@Component({
  selector: 'app-yearly-breakdown',
  templateUrl: './yearly-breakdown.component.html',
  styleUrls: ['./yearly-breakdown.component.css']
})
export class YearlyBreakdownComponent implements OnInit {
  @Input() investProjectionStock: InvestProjectionStock;
  @Input() investProjection: InvestProjection;
  constructor() { }

  ngOnInit() {
  }

}
