import { Component, OnInit, Input } from '@angular/core';
import { HistoricalPrice } from '../../../interfaces/historicalprice';


@Component({
  selector: 'app-gain-loss',
  templateUrl: './gain-loss.component.html',
  styleUrls: ['./gain-loss.component.css']
})
export class GainLossComponent implements OnInit {
  @Input() historicalPrices: HistoricalPrice[];
  yearGainLoss: Array<YearGainLoss>;
  constructor() { }

  ngOnInit() {
    this.getYearlyGainLoss();
  }

  getYearlyGainLoss(): void {
    var historicPriceCount = this.historicalPrices.length;

    if (historicPriceCount == 0) {
      return;
    }
    let yearLoss: YearGainLoss = new YearGainLoss();
    yearLoss.year = new Date(this.historicalPrices[0].historicDate).getFullYear();
    yearLoss.gainLoss = 0;
    this.yearGainLoss = [];
    this.yearGainLoss.push(yearLoss);
    let currentPrice = this.historicalPrices[0].close;
    for (var i = 0; i < historicPriceCount; i++) {
      let currentYear = new Date(this.historicalPrices[i].historicDate).getFullYear();
      if (currentYear != this.yearGainLoss[this.yearGainLoss.length - 1].year) {
        let yearLoss: YearGainLoss = new YearGainLoss();
        yearLoss.year = currentYear;
        yearLoss.gainLoss = 0;
        this.yearGainLoss.push(yearLoss);

      }
      this.yearGainLoss[this.yearGainLoss.length - 1].gainLoss = this.yearGainLoss[this.yearGainLoss.length - 1].gainLoss + this.historicalPrices[i].close - currentPrice

      currentPrice = this.historicalPrices[i].close;
    }


  }

}
export class YearGainLoss {
  year: number;
  gainLoss: number;
}

