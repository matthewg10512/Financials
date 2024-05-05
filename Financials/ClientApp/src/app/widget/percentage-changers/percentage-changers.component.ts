import { Component, OnInit, Input } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Security } from '../../interfaces/security';
import { SecurityResourceParameters } from '../../interfaces/securityresourceparameters';


@Component({
  selector: 'widget-percentage-changers',
  templateUrl: './percentage-changers.component.html',
  styleUrls: ['./percentage-changers.component.css']
})
export class PercentageChangersComponent implements OnInit {
  @Input() percentChangeType: string;
  @Input() changeTitle: string;
  weekLowSecurities: Security[];
  sortPerLow: boolean;
  sortPerHigh: boolean;
  @Input() perChange52Week: number;



  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    console.log(this.percentChangeType);

    this.RunProcess();
    
    
  }
  RunProcess(): void {
    switch (this.percentChangeType) {
      case '52WeekLow':
        this.get52WeekLow();
        break;
      case '52WeekHigh':
        this.get52WeekHigh();
        break;
    }
  }
  sortByPerLow() {
    if (!this.sortPerLow) {
      this.weekLowSecurities.sort((a, b) => ((a.currentPrice - a.yearLow) / a.yearLow) - ((b.currentPrice - b.yearLow) / b.yearLow));
    }
    else {
      this.weekLowSecurities.sort((a, b) => ((b.currentPrice - b.yearLow) / b.yearLow) - ((a.currentPrice - a.yearLow) / a.yearLow));
    }
  }
  sortByPerHigh() {
    if (!this.sortPerHigh) {
      this.weekLowSecurities.sort((a, b) => ((a.currentPrice - a.yearHigh) / a.yearHigh) - ((b.currentPrice - b.yearHigh) / b.yearHigh));
    }
    else {
      this.weekLowSecurities.sort((a, b) => ((b.currentPrice - b.yearHigh) / b.yearHigh) - ((a.currentPrice - a.yearHigh) / a.yearHigh));
    }
  }

  sortData(field: string): void {
    switch (field) {

      case 'perLow':
        this.sortPerLow = !this.sortPerLow;
        this.sortByPerLow();
        break;

      case 'perHigh':
        this.sortPerHigh = !this.sortPerHigh;
        this.sortByPerHigh();
        break;
    }
  }
  get52WeekHigh(): void {

    
    if (this.perChange52Week <= 0) {
      this.perChange52Week = 5;
    }
    let securityParam: SecurityResourceParameters = new SecurityResourceParameters();
    securityParam.perFrom52WeekHigh = this.perChange52Week / 100;
    securityParam.minVolume = 3000000;
    securityParam.currentPriceMin = 5;
    this.securityService.getSecurities(securityParam).subscribe(weekLowSecurities => {
      this.weekLowSecurities = weekLowSecurities;


    });




  }


  get52WeekLow(): void {

    if (this.perChange52Week <= 0) {
      this.perChange52Week = 15;
    }
    let securityParam: SecurityResourceParameters = new SecurityResourceParameters();
    securityParam.perFrom52WeekLow = this.perChange52Week / 100;
    securityParam.minVolume = 3000000;
    securityParam.currentPriceMin = 5;
    this.securityService.getSecurities(securityParam).subscribe(weekLowSecurities => {
      this.weekLowSecurities = weekLowSecurities;

      
    });


    

  }



}
