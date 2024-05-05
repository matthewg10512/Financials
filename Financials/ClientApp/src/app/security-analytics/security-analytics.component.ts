import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { FullSecurityAnalytic } from '../interfaces/fullsecurityanalytic';
import { TopMoversResourceParameters } from '../interfaces/resourceparameters/topmoversresourceparameters';
import { TopMoverConcat } from '../interfaces/topmoverconcat';
import { TopMoverCategory } from '../interfaces/topmovercategory';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EarningsHistoricDate } from '../interfaces/earningshistoricdate';
import { CurrentBullBearRun } from '../interfaces/currentbullbearrun';
import { TooltipPosition } from '@angular/material/tooltip';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { BullBearRun } from '../interfaces/bullbearrun';

@Component({
  selector: 'app-security-analytics',
  templateUrl: './security-analytics.component.html',
  styleUrls: ['./security-analytics.component.css']
})
export class SecurityAnalyticsComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  positionModal = new FormControl(this.positionOptions[0]);
  toppings = new FormControl('');
  yearCounts = new FormControl('');
  bullRunOption = new FormControl('');
  topMoverParameter: TopMoversResourceParameters
  topMoversDict: Map<number, string>;
  topMovers: TopMoverConcat[];
  selectedMoverCategories: TopMoverCategory[];
  selectedyearCounts: number[];
  yearCountFilters: number[];
  selecteEarningsDate: Date;
  yoyCountFilters: number[];
  topMoverCategories: TopMoverCategory[];

  fullSecurityAnalytics: FullSecurityAnalytic[];
  filteredSecurityAnalytics: FullSecurityAnalytic[];
  pagedSecurityAnalytics: FullSecurityAnalytic[];

  pagingAmount: number;

  pageStart: number;
  stockSymbol: string;
  stockName: string;
  pagingArray: number[];

  recordsReturned: number;
  numberOfPages: number;
  pageSelected: number;

  loadedTopMovers: boolean;
  loadedAnalytics: boolean;

  sortingByPeakDayRange: boolean;
  sortingByCurrentPeakPercent: boolean;
  sortingByYearCount: boolean;
  sortingByReturnYoY: boolean;
  sortingEarningsDate: boolean;
  sortingPrice: boolean;
  sortingPercentChange: boolean;

  sortEarningsDate: boolean;
  sortName: boolean;
  sortingName: boolean;

  sortPeakDayRange: boolean;
  sortCurrentPeakPercent: boolean;
  sortYearCount: boolean;
  sortReturnYoY: boolean;
  sortPrice: boolean;
  sortPercentChange: boolean;

  peakRangeLow: number;
  peakRangeHigh: number;
  selectedAllYearCount: boolean;
  selectedAllYOYCount: boolean;
  selectedYOYCounts: number[];
  stockPriceLow: number;
  stockPriceHigh: number;


  bullBearRuns: BullBearRun[];
  currentBullRunOptions: CurrentBullBearRun[];
  selectedcurrentBullRunOptions: number[];

  @ViewChild('myModalClose', { static: false }) modalClose;
  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    this.pageSelected = 1;
    this.sortingByPeakDayRange = false;
    this.sortingByCurrentPeakPercent = false;
    this.sortingByYearCount = false;
    this.sortingByReturnYoY = false;
    this.pageStart = 0;
    this.pagingAmount = 200;
    this.topMoversDict = new Map<number, string>();
    this.loadedAnalytics = false;
    this.loadedTopMovers = false;
    this.currentBullRunOptions = [];
    this.selectedcurrentBullRunOptions = [];
    this.bullBearRuns = [];
    this.stockName = '';
    this.selectedyearCounts = [];
    this.yearCountFilters = [];
    this.yoyCountFilters = [];
    this.selectedYOYCounts = [];
    this.GetSecurityAnalytics();


  }

  //filterMoverCategories($event)
  //  filterMoverCategories(value: any)

  bullBearType(runType: number) {
    let runTypeName: string;
    runTypeName = '';
    switch (runType) {
      case 0:
        runTypeName = 'Bear from Last High'
        break;
      case 1:
        runTypeName = 'Bull from High'
        break;
      case 2:
        runTypeName = 'Bear from Recent Bull'
        break;
      case 3:
        runTypeName = 'Bull from Recent Bear'
        break;
    }
    return runTypeName;

  }

  selectAllYearCount() {
    this.selectedAllYearCount = !this.selectedAllYearCount;
    if (this.selectedAllYearCount) {

      for (var yearCountFilter of this.yearCountFilters) {
        this.selectedyearCounts.push(yearCountFilter);
      }
    } else {
      this.selectedyearCounts = [];
    }
    this.filterCategories();
  }

  wipeBullBearRun() {
    this.bullBearRuns = [];
  }
  updateEarningsDate(dateObject) {

    this.selecteEarningsDate = dateObject.value;
   

  }
  selectAllYOYCount() {
    this.selectedAllYOYCount = !this.selectedAllYOYCount;
    if (this.selectedAllYOYCount) {

      for (var yearCountFilter of this.yoyCountFilters) {
        this.selectedYOYCounts.push(yearCountFilter);
      }
    } else {
      this.selectedYOYCounts = [];
    }
    this.filterCategories();
  }


  filterCategories() {
    this.filterMoverCategories();
    this.pagingArray = [];
    this.recordsReturned = this.filteredSecurityAnalytics.length;
    this.numberOfPages = this.recordsReturned / 200;
    for (var i = 1; i <= this.numberOfPages + 1; i++) {
      this.pagingArray.push(i);
    }
    this.processPaging();

    
  }

  compareDates(startDate:Date, endDate: Date) {
    let Difference_In_Time =
      new Date(endDate).getTime() - new Date(startDate).getTime();

    // Calculating the no. of days between
    // two dates
    let Difference_In_Days =
      Math.round
        (Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
  }

  getFullBullBearRuns(securityid: number) {
    

    this.securityService.getBullBearRuns(securityid).subscribe(bullBearRuns => {
      this.bullBearRuns = bullBearRuns;
      
    });

  }
  getPriceRangesDetails(psAnaly: FullSecurityAnalytic) {
    try {
      return '10 Day ' + psAnaly.securityAnalytic.minPriceDay10 + ' - ' + psAnaly.securityAnalytic.movingAverageDay10 + ' - ' + psAnaly.securityAnalytic.maxPriceDay10 + ' \n' +
      '50 Day ' + psAnaly.securityAnalytic.minPriceDay50 + ' - ' + psAnaly.securityAnalytic.movingAverageDay50 + ' - ' + psAnaly.securityAnalytic.maxPriceDay50 + ' \n' +
        '200 Day ' + psAnaly.securityAnalytic.minPriceDay200 + ' - ' + psAnaly.securityAnalytic.movingAverageDay200 + ' - ' + psAnaly.securityAnalytic.maxPriceDay200 + ' \n' +
        '1 Year ' + psAnaly.securityAnalytic.minPriceYear1 + ' - ' + psAnaly.securityAnalytic.movingAverageYear1 + ' - ' + psAnaly.securityAnalytic.maxPriceYear1 + ' \n' +
        '2 Year ' + psAnaly.securityAnalytic.minPriceYear2 + ' - ' + psAnaly.securityAnalytic.movingAverageYear2 + ' - ' + psAnaly.securityAnalytic.maxPriceYear2;
    } catch (ex) {
      return '';
    }
  }

  getBullBearRunPrices(bullBearRun: BullBearRun) {
    try {
      return bullBearRun.highPrice + '(' + bullBearRun.highDate + ')' + ' \n' +
        bullBearRun.lowPrice + '(' + bullBearRun.lowDate + ')';
    } catch (ex) {
      return '';
    }
  }

  filterMoverCategories() {
    this.filteredSecurityAnalytics = this.fullSecurityAnalytics.slice();//.slice(0, 100);

    if (this.sortingByPeakDayRange == true) { this.sortByDaysRange(); }
    if (this.sortingByCurrentPeakPercent == true) { this.sortByCurrentPeakPercent(); }
    if (this.sortingByYearCount == true) { this.sortByYearCount(); }
    if (this.sortingByReturnYoY == true) { this.sortbyReturnYoY(); }

    if (this.sortingEarningsDate == true) { this.sortbyEarningsDate(); }
    if (this.sortingName == true) { this.sortbyName(); }


    if (this.peakRangeLow > 0) {
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.currentPeakRange.rangeLength > this.peakRangeLow)
    }
    if (this.peakRangeHigh > 0) {
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.currentPeakRange.rangeLength < this.peakRangeHigh)
    }

    if (this.stockName) {
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.name.toLowerCase().includes(this.stockName.toLowerCase()));
    }

    if (this.stockSymbol) {
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.symbol.toLowerCase() == this.stockSymbol.toLowerCase());
    }
    if (this.selectedyearCounts) {
      

        // alert(this.pagedSecurityAnalytics[0].topMoverDetails.indexOf(selectedMoverCategory.movingCategory) > -1);
        this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
          this.selectedyearCounts.indexOf(x.securityYearOverYearComparison.yearCount) > -1);
        //
      
    }
    if (this.selectedYOYCounts) {


      // alert(this.pagedSecurityAnalytics[0].topMoverDetails.indexOf(selectedMoverCategory.movingCategory) > -1);
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        this.selectedYOYCounts.indexOf(x.securityYearOverYearComparison.avgYOYUp) > -1);
      //

    }
    

    //if (this.selectedcurrentBullRunOptions) {

    //}
    const even = (element) => this.selectedcurrentBullRunOptions.indexOf(element) > -1;
    var details = this.filteredSecurityAnalytics[0].currentBullBearRuns.some((element) =>
      this.selectedcurrentBullRunOptions.indexOf(element.runType) > -1
    );
    this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
      x.currentBullBearRuns.some((element) => this.selectedcurrentBullRunOptions.indexOf(element.runType) > -1)
    );
    if (this.selectedMoverCategories) {
      for (var selectedMoverCategory of this.selectedMoverCategories) {

        // alert(this.pagedSecurityAnalytics[0].topMoverDetails.indexOf(selectedMoverCategory.movingCategory) > -1);
        this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
          x.topMoverDetails.indexOf(selectedMoverCategory.movingCategory) > -1);
        //
      }

    }

    if (this.selecteEarningsDate) {
      
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        (x.earningsDate ? new Date(x.earningsDate).getTime() : 0) > new Date(this.selecteEarningsDate).getTime());
    }
 
    
    if (this.stockPriceLow) {

      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.currentPrice > this.stockPriceLow);
    }
    if (this.stockPriceHigh) {
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.currentPrice < this.stockPriceHigh);
    }
   

  }

  goToLink(id: number) {

    window.open('detail/' + id, '_blank');

  }
  MoverDetails(pagedSecurityAnalytic: FullSecurityAnalytic) {
    return this.topMoversDict.get(pagedSecurityAnalytic.securityAnalytic.securityId);
  }




  processPaging() {
    //this.filteredSecurityAnalytics = this.fullSecurityAnalytics;
  //  alert('this.pageStart' + this.pageStart + ' this.pagingAmount ' + this.pagingAmount);
    this.pagedSecurityAnalytics = this.filteredSecurityAnalytics.splice(this.pageStart * this.pagingAmount, this.pagingAmount)
  }



  highPercentJumps(earningsHistoricDates: EarningsHistoricDate[]) {

    if (!earningsHistoricDates) { return false; }
    var earningsDatesCount = earningsHistoricDates.length;
    for (var i = 0; i < earningsDatesCount; i++) {
      if (earningsHistoricDates[i].percentChange > 10 || earningsHistoricDates[i].percentChange < -10) {
        return true;
      }
    }

    return false;



  }

  IsBuyingOpportunity(pagedSecurityAnalytic: FullSecurityAnalytic) {

    return pagedSecurityAnalytic.currentPrice < pagedSecurityAnalytic.securityAnalytic.movingAverageDay10 &&
      pagedSecurityAnalytic.currentPrice > pagedSecurityAnalytic.securityAnalytic.movingAverageDay100
      &&
      pagedSecurityAnalytic.currentPrice > pagedSecurityAnalytic.securityAnalytic.movingAverageDay200
      &&
      pagedSecurityAnalytic.currentPrice > pagedSecurityAnalytic.securityAnalytic.movingAverageYear1
      &&
      pagedSecurityAnalytic.currentPrice > pagedSecurityAnalytic.securityAnalytic.movingAverageYear2
   // return true;
  }

  addTopMovers() {
    if (this.loadedTopMovers && this.loadedAnalytics) {

      for (var fullSecurityAnalytic of this.fullSecurityAnalytics) {

        var details = this.topMoversDict.get(fullSecurityAnalytic.securityAnalytic.securityId);
        if (details) {
          fullSecurityAnalytic.topMoverDetails = details.split(',');
        }
        else {
          fullSecurityAnalytic.topMoverDetails = [];
        }
      }
      
      this.filterMoverCategories();
      this.processPaging();
    }

   

  }
  pageRecords(page: number) {
    this.pageSelected = page;
    this.pageStart = (page - 1);
    this.filterMoverCategories();

    this.processPaging();



  }
  GetSecurityAnalytics() {

    var bearHighDetail: CurrentBullBearRun = new CurrentBullBearRun();
    bearHighDetail.runType = 0;
    this.currentBullRunOptions.push(bearHighDetail);
    var bullHighDetail: CurrentBullBearRun = new CurrentBullBearRun();
    bullHighDetail.runType = 1;
    this.currentBullRunOptions.push(bullHighDetail);
    var bearFromLow: CurrentBullBearRun = new CurrentBullBearRun();
    bearFromLow.runType = 2;
    this.currentBullRunOptions.push(bearFromLow);
    var bullFromLow: CurrentBullBearRun = new CurrentBullBearRun();
    bullFromLow.runType = 3;
    this.currentBullRunOptions.push(bullFromLow);

    this.selectedcurrentBullRunOptions.push(0);
    this.selectedcurrentBullRunOptions.push(1);
    this.selectedcurrentBullRunOptions.push(2);
    this.selectedcurrentBullRunOptions.push(3);


    this.securityService.getTopMoverCategories().subscribe(topMoverCategories => {
      this.topMoverCategories = topMoverCategories;
      
    });
    

   // searchTopMovers(topMoverParameter: TopMoversResourceParameters): Observable < TopMoverConcat[] > {
    this.topMoverParameter = new TopMoversResourceParameters();
    var dt = new Date;
    dt.setDate(dt.getDate() - 5);
    this.topMoverParameter.dateAddedMin = new Date(dt.toDateString());
    this.topMoverParameter.securityId = 0;
    this.securityService.searchTopMovers(this.topMoverParameter).subscribe(topMovers => {
      this.topMovers = topMovers;
      for (var mover of this.topMovers) {
        this.topMoversDict.set(mover.securityId, mover.movers);
      }
      
      this.loadedTopMovers = true;
      this.addTopMovers();

    });


    this.securityService.getFullSecurityAnalytics().subscribe(fullSecurityAnalytics => {
      this.fullSecurityAnalytics = fullSecurityAnalytics;
      this.fullSecurityAnalytics.sort((a, b) => a.symbol.localeCompare(b.symbol));

      this.fullSecurityAnalytics.sort((a, b) => (
        //(a.currentPrice - a.securityAnalytic.movingAverageDay50) / a.currentPrice) - ((b.currentPrice - b.securityAnalytic.movingAverageDay50) / b.currentPrice)
        (
          (a.currentPrice < a.securityAnalytic.movingAverageDay10 &&
            a.currentPrice > a.securityAnalytic.movingAverageDay100
            &&
            a.currentPrice > a.securityAnalytic.movingAverageDay200
            &&
            a.currentPrice > a.securityAnalytic.movingAverageYear1
            &&
            a.currentPrice > a.securityAnalytic.movingAverageYear2 ? 100 : 200) +
          (((a.currentPrice - a.securityAnalytic.movingAverageDay50) / a.securityAnalytic.movingAverageDay50) * 100))

        -
        (
          (b.currentPrice < b.securityAnalytic.movingAverageDay10 &&
            b.currentPrice > b.securityAnalytic.movingAverageDay100
            &&
            b.currentPrice > b.securityAnalytic.movingAverageDay200
            &&
            b.currentPrice > b.securityAnalytic.movingAverageYear1
            &&
            b.currentPrice > b.securityAnalytic.movingAverageYear2 ? 100 : 200) +
          (((b.currentPrice - b.securityAnalytic.movingAverageDay50) / b.securityAnalytic.movingAverageDay50) * 100)
        )

      )

      );
      this.pagingArray = [];
      this.recordsReturned = fullSecurityAnalytics.length;
      this.numberOfPages = this.recordsReturned / 200;
      for (var i = 1; i <= this.numberOfPages + 1; i++) {
        this.pagingArray.push(i);
      }

      //  this.getYearlyGainLoss();

      for (var i = 0; i < fullSecurityAnalytics.length; i++) {
        var yearCount = fullSecurityAnalytics[i].securityYearOverYearComparison.yearCount;
        var avgYOYCount = fullSecurityAnalytics[i].securityYearOverYearComparison.avgYOYUp;
        if (this.yearCountFilters.indexOf(yearCount) == -1) {
          this.yearCountFilters.push(yearCount)
          this.selectedyearCounts.push(yearCount)
        }
        if (this.yoyCountFilters.indexOf(avgYOYCount) == -1) {
          this.yoyCountFilters.push(avgYOYCount)
          this.selectedYOYCounts.push(avgYOYCount)
          
        }
      }
      this.yearCountFilters.sort((a, b) => a -  b);
      this.selectedAllYearCount = true;


      this.yoyCountFilters.sort((a, b) => a - b);
      this.selectedAllYOYCount = true;

       this.loadedAnalytics = true;
       this.addTopMovers();
     }
       , error => {
         console.error(error)
       }

     );
   }





   //Sorting Area

  sortData(field: string): void {
    this.sortingByPeakDayRange = false;
    this.sortingByCurrentPeakPercent = false;
    this.sortingByYearCount = false;
    this.sortingByReturnYoY = false;
    this.sortingPrice = false;
    this.sortingPercentChange = false;
    this.sortingEarningsDate = false;
    this.sortingName = false;

    this.filterMoverCategories();
    switch (field) {

      case 'price':
        this.sortingPrice = true;
        this.sortPrice = !this.sortPrice;
        this.sortByPrice();
        break;

      case 'percentchange':
        this.sortingPercentChange = true;
        this.sortPercentChange = !this.sortPercentChange;
        this.sortByPercentChange();
        break;

      case 'name':
        this.sortingName = true;
        this.sortName = !this.sortName;
        this.sortbyName();
        break;
      case 'earningsDate':
        this.sortingEarningsDate = true;
        this.sortEarningsDate = !this.sortEarningsDate;
        this.sortbyEarningsDate();
        break;

      case 'returnYoY':
        this.sortingByReturnYoY = true;
        this.sortReturnYoY = !this.sortReturnYoY;
        this.sortbyReturnYoY();
        break;


      case 'yearCount':
        this.sortByYearCount();
        this.sortYearCount = !this.sortYearCount;
        this.sortingByYearCount = true;
        break;

      case 'currentPeakPercent':
        this.sortingByCurrentPeakPercent = true;
        this.sortCurrentPeakPercent = !this.sortCurrentPeakPercent;
        this.sortByCurrentPeakPercent();
        break;


      case 'daysRange':
        this.sortingByPeakDayRange = true;
        this.sortPeakDayRange = !this.sortPeakDayRange;
        this.sortByDaysRange();
        break;





    }

    this.processPaging();
    //daysRange
    /*
    if (!this.sortNameDesc) {
      this.securities.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      this.securities.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.sortNameDesc = !this.sortNameDesc;
    */
  }
  sortbyName() {
    if (!this.sortName) {
      this.filteredSecurityAnalytics.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  sortbyEarningsDate() {

    if (!this.sortEarningsDate) {
      this.filteredSecurityAnalytics.sort((a, b) => new Date(a.earningsDate).getTime() - new Date(b.earningsDate).getTime());
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => new Date(b.earningsDate).getTime() - new Date(a.earningsDate).getTime());
    }


  }

  sortbyReturnYoY() {

    if (!this.sortReturnYoY) {
      this.filteredSecurityAnalytics.sort((a, b) => a.securityYearOverYearComparison.avgReturnYOY - b.securityYearOverYearComparison.avgReturnYOY);
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.securityYearOverYearComparison.avgReturnYOY - a.securityYearOverYearComparison.avgReturnYOY);
    }


  }

  sortByYearCount() {
    if (!this.sortYearCount) {
      this.filteredSecurityAnalytics.sort((a, b) => a.securityYearOverYearComparison.yearCount - b.securityYearOverYearComparison.yearCount);
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.securityYearOverYearComparison.yearCount - a.securityYearOverYearComparison.yearCount);
    }
  }

  sortByCurrentPeakPercent() {
    console.log('this.sortCurrentPeakPercent' + this.sortCurrentPeakPercent);
    if (!this.sortCurrentPeakPercent) {
      this.filteredSecurityAnalytics.sort((a, b) => a.currentPeakRange.peakRangeCurrentPercentage - b.currentPeakRange.peakRangeCurrentPercentage);
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.currentPeakRange.peakRangeCurrentPercentage - a.currentPeakRange.peakRangeCurrentPercentage);
    }
  }

  sortByDaysRange() {
    if (!this.sortPeakDayRange) {
      this.filteredSecurityAnalytics.sort((a, b) => a.currentPeakRange.rangeLength - b.currentPeakRange.rangeLength);
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.currentPeakRange.rangeLength - a.currentPeakRange.rangeLength);
    }
  }

  sortByPrice() {
    if (!this.sortPrice) {
      this.filteredSecurityAnalytics.sort((a, b) => a.currentPrice - b.currentPrice);
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.currentPrice - a.currentPrice);
    }
  }
  sortByPercentChange() {
    if (!this.sortPercentChange) {
      this.filteredSecurityAnalytics.sort((a, b) => a.percentageChange - b.percentageChange);
    }
    else {
      this.filteredSecurityAnalytics.sort((a, b) => b.percentageChange - a.percentageChange);
    }
    //Sorting Area
  }

}
