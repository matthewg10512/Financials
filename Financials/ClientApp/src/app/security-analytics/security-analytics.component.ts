import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { FullSecurityAnalytic } from '../interfaces/fullsecurityanalytic';
import { TopMoversResourceParameters } from '../interfaces/resourceparameters/topmoversresourceparameters';
import { TopMoverConcat } from '../interfaces/topmoverconcat';
import { TopMoverCategory } from '../interfaces/topmovercategory';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-security-analytics',
  templateUrl: './security-analytics.component.html',
  styleUrls: ['./security-analytics.component.css'],

})
export class SecurityAnalyticsComponent implements OnInit {
  toppings = new FormControl('');
  topMoverParameter: TopMoversResourceParameters
  topMoversDict: Map<number, string>;
  topMovers: TopMoverConcat[];
  selectedMoverCategories: TopMoverCategory[];
  topMoverCategories: TopMoverCategory[];

  fullSecurityAnalytics: FullSecurityAnalytic[];
  filteredSecurityAnalytics: FullSecurityAnalytic[];
  pagedSecurityAnalytics: FullSecurityAnalytic[];

  pagingAmount: number;

  pageStart: number;


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
    this.GetSecurityAnalytics();
    
  }

  //filterMoverCategories($event)
  //  filterMoverCategories(value: any)

  filterCategories() {
    this.filterMoverCategories();
    this.processPaging();
  }

  filterMoverCategories() {
    this.filteredSecurityAnalytics = this.fullSecurityAnalytics.slice();//.slice(0, 100);

    if (this.sortingByPeakDayRange == true) { this.sortByDaysRange(); }
    if (this.sortingByCurrentPeakPercent == true) { this.sortByCurrentPeakPercent(); }
    if (this.sortingByYearCount == true) { this.sortByYearCount(); }
    if (this.sortingByReturnYoY == true) { this.sortbyReturnYoY(); }

    if (this.sortingEarningsDate == true) { this.sortbyEarningsDate(); }
    if (this.sortingName == true) { this.sortbyName(); }
    

    if (!this.selectedMoverCategories) {
      return;
    }
    for (var selectedMoverCategory of this.selectedMoverCategories) {

     // alert(this.pagedSecurityAnalytics[0].topMoverDetails.indexOf(selectedMoverCategory.movingCategory) > -1);
      this.filteredSecurityAnalytics = this.filteredSecurityAnalytics.filter(x =>
        x.topMoverDetails.indexOf(selectedMoverCategory.movingCategory) > -1);
        //
    }

    
    
    
    
  }

  goToLink(id: number) {

    window.open('detail/' + id, '_blank');

  }
  MoverDetails(pagedSecurityAnalytic: FullSecurityAnalytic) {
    return this.topMoversDict.get(pagedSecurityAnalytic.securityAnalytic.securityId);
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

  }
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

  processPaging() {
    //this.filteredSecurityAnalytics = this.fullSecurityAnalytics;
  //  alert('this.pageStart' + this.pageStart + ' this.pagingAmount ' + this.pagingAmount);
    this.pagedSecurityAnalytics = this.filteredSecurityAnalytics.splice(this.pageStart * this.pagingAmount, this.pagingAmount)
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
       
       this.loadedAnalytics = true;
       this.addTopMovers();
     }
       , error => {
         console.error(error)
       }

     );
   }

}
