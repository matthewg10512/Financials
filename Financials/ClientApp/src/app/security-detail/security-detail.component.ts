import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Security } from '../interfaces/security';
import { SecurityService } from '../services/security.service';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HistoricalPrice } from '../interfaces/historicalprice';


import { DatePipe } from '@angular/common';
import { PeakRangeDetail } from '../interfaces/peakrangedetail';
import { CurrentPeakRange } from '../interfaces/currentpeakranges';
import { PriorPurchaseEstimate } from '../interfaces/PriorPurchaseEstimate';
import { SecurityPercentageStatistic } from '../interfaces/SecurityPercentageStatistic';




@Component({
  selector: 'app-security-detail',
  templateUrl: './security-detail.component.html',
  styleUrls: ['./security-detail.component.css']
  
})
export class SecurityDetailComponent implements OnInit {
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 71.1, 71.2], label: 'Stock History' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
   
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      borderWidth: 1,
      pointRadius:1,
      backgroundColor: 'rgba(255,255,255, 0.0)',
    },
  ];
  currentPeakRange: CurrentPeakRange;
  peakRanges: PeakRangeDetail[];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  datePipe: DatePipe = new DatePipe('en-US');
  security: Security;
  historicalPrices: HistoricalPrice[];
  historyPriceSearch: number = 1;
  historyPriceName: string;
  securityPercentageStatistic: SecurityPercentageStatistic;
  
  btnUpdateSave = false;

  priorPurEst: PriorPurchaseEstimate;

  constructor(
    private route: ActivatedRoute,
    private prefSecurityService: SecurityService,
    private location: Location
    
  ) { }

  ngOnInit(): void {
    this.getHistoryPriceName();
    this.getSecurity();
    this.getHistoricalPrices(365 * 10);
  }

  getHistoryPriceName(): void {
    let hisPriceName: string;
    switch (this.historyPriceSearch) {
      case 1:
        hisPriceName = '1 Day';
        break;
      case 2:
        hisPriceName = '5 Days';
        break;
      case 3:
        hisPriceName = '1 Month';
        break;
      case 4:
        hisPriceName = '6 Months';
        break;
      case 5:
        hisPriceName = '1 Year';
        break;
      case 6:
        hisPriceName = '5 Years';
        break;
    }
    this.historyPriceName = hisPriceName;
  }
  

  getSecurity(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.prefSecurityService.getSecurity(id)
      .subscribe(security => {
        this.security = security

        //this.onlyPreferred = this.security.preferred;


        this.prefSecurityService.GetPeakRangeDetails(security.id).subscribe(peakRangeDetails => {
          this.peakRanges = peakRangeDetails;
        });

        this.prefSecurityService.GetCurrentPeakRanges(security.id).subscribe(currentPeakRanges => {
          if (currentPeakRanges.length > 0) {
            this.currentPeakRange = currentPeakRanges[0];
          }
        });

        this.prefSecurityService.GetPriorPurchaseEstimate(security.id).subscribe(priorPurchaseEstimate => {
          this.priorPurEst = priorPurchaseEstimate;
        });

        this.prefSecurityService.GetSecurityPercentageStatistic(security.id).subscribe(securityPercentageStatistic => {
          this.securityPercentageStatistic = securityPercentageStatistic;
        });
        

      });
  }



  changeHistory(historyType: number): void {
    if (historyType != this.historyPriceSearch) {

      this.historyPriceSearch = historyType;
      this.getHistoryPriceName();
      this.SetHistoricalChart();
    }
    
  }


  getHistoryDaysBack(): number {
    let daysBack: number;
    switch (this.historyPriceSearch) {
      case 1:
        daysBack = 1;
        break;
      case 2:
        daysBack = 5;
        break;
      case 3:
        daysBack = 30;
        break;
      case 4:
        daysBack = 6*30;
        break;
      case 5:
        daysBack = 365;
        break;
      case 6:
        daysBack = 365*5;
        break;
    }
    return daysBack;
  }

  /*
  calculatePeaks(): void {
    this.peakRanges = [];


    //  rangeName: string;
     // rangeCount: number;

    let rangeStart: Date;
    var historicPrices = this.historicalPrices.length;
    var highRange = 0;
    var lowRange = 0;
    for (var i = 0; i < historicPrices; i++) {
      if (this.historicalPrices[i].open > highRange) {

        if (highRange != 0 && highRange != lowRange) {
          var percentLevel = (highRange - lowRange) / highRange;
          if (percentLevel > .009) {


            

            var newRange = new Date(this.historicalPrices[i].historicDate);

            var daysRange = (newRange.getTime() - rangeStart.getTime()) / (1000 * 3600 * 24);

            
            let percentRanking:number  = Math.floor((percentLevel * 100) / 5)
            if (this.peakRanges[percentRanking]) {
              let peakrangedetails: peakrangedetail = this.peakRanges[percentRanking];
              peakrangedetails.rangeLength += daysRange;
              if (peakrangedetails.maxRangeLength < daysRange) {
                peakrangedetails.maxRangeLength = daysRange;
              }
              peakrangedetails.rangeCount += 1;
              this.peakRanges[percentRanking] = peakrangedetails;
            } else {
              let peakrangedetails: peakrangedetail = new peakrangedetail();
              peakrangedetails.rangeName = (percentRanking * 5).toString() + '% - ' + ((percentRanking * 5) + 4.99).toFixed(2).toString() + '%'
              peakrangedetails.rangeLength = daysRange;
              peakrangedetails.maxRangeLength = daysRange;
              peakrangedetails.rangeCount = 1;
              this.peakRanges[percentRanking] = peakrangedetails;
            }

           // this.peakRanges.push(percentLevel);
          }
          
        }
        rangeStart = new Date(this.historicalPrices[i].historicDate);
        highRange = this.historicalPrices[i].open;
        lowRange = this.historicalPrices[i].open;
      }
      if (this.historicalPrices[i].open < lowRange) {
        lowRange = this.historicalPrices[i].open;
      }
    }
  }
  */
  getHistoricalPrices(historyDays: number ): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.prefSecurityService.getHistoricalPrices(id, historyDays !=0 ? historyDays: this.getHistoryDaysBack())
      .subscribe(historicalPrices => {
        this.historicalPrices = historicalPrices;
        this.historicalPrices.sort((a, b) => new Date(a.historicDate).getTime() - new Date(b.historicDate).getTime());
      //  this.getYearlyGainLoss();
        this.SetHistoricalChart();
         


      }
        , error => {
          console.error(error)
        }

    );



  }
 
  SetHistoricalChart(): void {
    var historicPriceCount = this.historicalPrices.length;
    if (historicPriceCount == 0) {
      return;
    }
    var dataDetails = new Array();
    var labels = new Array();
    var countPrice = 0;
    let dateRange: DateRange = this.isDateInRange();
    

    var spreadDetails = dateRange.rangeOfDays > 300;
    var setPoints = dateRange.rangeOfDays > 500 ? 20 : 10;
    console.log(spreadDetails);

    
   


    for (var i = 0; i < historicPriceCount; i++) {
      //console.log( JSON.stringify(historicalPrices[i]));
      var date = new Date(this.historicalPrices[i].historicDate);
      if (!(dateRange.startDate >= date && dateRange.endDate <= date)) {
        continue;
      }
      //console.log(date); 
      var dateLabel = this.datePipe.transform(date, "yyyy-MM-dd");
      countPrice++;
      if (spreadDetails) {
        if (countPrice < setPoints) {
          continue;
        }
        countPrice = 0;
      }
      labels.push(dateLabel);
      dataDetails.push(this.historicalPrices[i].close);
    }


    console.log(labels);
    this.lineChartData = [
      { data: dataDetails, label: 'History' },
    ];

    this.lineChartLabels = labels;
        //this.lineChartData: ChartDataSets[];


  }



  isDateInRange(): DateRange {
    let details: DateRange = new DateRange();

    
    const currentDate = new Date(this.historicalPrices[this.historicalPrices.length - 1].historicDate);
    
    const priorDate = new Date(this.historicalPrices[this.historicalPrices.length - 1].historicDate);
    priorDate.setDate(priorDate.getDate() - this.getHistoryDaysBack());


    
    

      
    details.startDate = currentDate;
    details.endDate = priorDate ;


    details.rangeOfDays = (details.startDate.getTime() - details.endDate.getTime()) / (1000 * 3600 * 24);

    return details;

  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.btnUpdateSave = true;
    this.prefSecurityService.updateSecurity(this.security)
      .subscribe(() => this.goBack());
  }


  



}
export class DateRange{
  startDate: Date;
  endDate: Date;
  rangeOfDays: number;
}

