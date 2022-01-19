import { Component, OnInit } from '@angular/core';
import { StockPurchaseOptionsResourceParameters } from '../interfaces/resourceparameters/StockPurchaseOptionsResourceParameters';
import { SecurityService } from '../services/security.service';
import { StockScreenerRecordDto } from '../interfaces/stockscreener/StockScreenerRecordDto';
import { ScreenerCriteria } from '../interfaces/stockscreener/ScreenerCriteria';
import { StockPurchaseOption } from '../interfaces/StockPurchaseOption';
import { StockScreenerSearchResourceParameters } from '../interfaces/resourceparameters/StockScreenerSearchResourceParameters';
import { StockScreener } from '../interfaces/stockscreener/StockScreener';
import { ScreeneCriteriaDetailDto } from '../interfaces/stockscreener/ScreeneCriteriaDetailDto';
import { StockScreenerSearchDetail } from '../interfaces/stockscreener/StockScreenerSearchDetail';

@Component({
  selector: 'app-stock-screener',
  templateUrl: './stock-screener.component.html',
  styleUrls: ['./stock-screener.component.css']
})
export class StockScreenerComponent implements OnInit {
  public stockScreenerSPO: StockPurchaseOptionsResourceParameters;
  searchObjects: {} = {};
  criteriaNames: {} = {};
  percentDropTypesList: any[]= [];
  calculatedPercentDropTypeList: any[] = [];
  stockOptions: StockPurchaseOption[];
  stockScreenerRec: StockScreenerRecordDto;
  screenerCritProps: string[] =[];
  screenerCritierias: ScreenerCriteria[];
  stockScreeners: StockScreener[];
  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    var d = new Date;
    d.setDate(d.getDate() - 1);
    this.stockScreenerSPO = new StockPurchaseOptionsResourceParameters();
    this.stockScreenerSPO.priorPurchaseEstimateSharesRangeLow = "10";
    this.stockScreenerSPO.securityVolumeRangeLow = '100000';
    this.stockScreenerSPO.securityLastModifiedRangeLow = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    this.stockScreenerSPO.securitypercentChangeRangeHigh = '0';
    this.stockScreenerSPO.priorPurchaseEstimateYearlyPercentRangeLow = '10';
    this.stockScreenerSPO.securityPercentDropperType = 'percent5CurrentPrice';

    this.GetAllScreenerCriterias();
    
    this.SetupDropLists();
    this.GetStockScreeners()
    
  }




  GetStockScreeners(): void {

    this.securityService.GetStockScreeners().subscribe(stockScreeners => {
      this.stockScreeners = stockScreeners;
    });
    
  }
  SetupDropLists(): void  {

    

    let percentDropCurrent: any = {};
    percentDropCurrent.id = 'current';
    percentDropCurrent.name = 'Current';
    this.percentDropTypesList.push(percentDropCurrent);

    let percentDropDayLow: any = {};
    percentDropDayLow.id = 'daylow';
    percentDropDayLow.name = 'Day Low';
    this.percentDropTypesList.push(percentDropDayLow);




    


    this.AddCalcPercentDropList('average', 'Average Drop');

    this.AddCalcPercentDropList('averagetimesoneandhalfpercent', 'One and A Half Percent (150%) Average Drop');
    this.AddCalcPercentDropList('averagedroplowaverage', 'Average Drop Below Average Drop');
    this.AddCalcPercentDropList('percentile5', '5th Percentile of Lowest Droppers');
    this.AddCalcPercentDropList('percentile10', '10th Percentile of Lowest Historic Dropper');
    this.AddCalcPercentDropList('percentile15', '15th Percentile of Lowest Historic Dropper');
    


  }

  AddCalcPercentDropList(id: string, name: string): void {

    let calcPercentDropRec: any = {};
    calcPercentDropRec.id = id;
    calcPercentDropRec.name = name;

    this.calculatedPercentDropTypeList.push(calcPercentDropRec)
  }




  UpsertStockScreenerRecord(): void {
    var screenCritPropsLen = this.screenerCritProps.length;
    var detailLen = this.stockScreenerRec.stockScreenerSearchDetails.length;

    for (var i2 = 0; i2 < screenCritPropsLen;i2++) {
      let criteriaFound: boolean = false;
      
      for (var i = 0; i < detailLen; i++) {
        var jsonName = this.stockScreenerRec.stockScreenerSearchDetails[i].screenerCriteria.jsonObjectName;  
        if (jsonName == this.screenerCritProps[i2]) {
          this.stockScreenerRec.stockScreenerSearchDetails[i].stockScreenerSearchDetail.searchValue = this.searchObjects[jsonName]
          criteriaFound = true;
        }
      
      }
      if (!criteriaFound) {
        var screenLength = this.screenerCritierias.length;
        for (var iscreen = 0; iscreen < screenLength; iscreen++) {

          if (this.screenerCritierias[iscreen].jsonObjectName == this.screenerCritProps[i2]) {
            let info: ScreeneCriteriaDetailDto = new ScreeneCriteriaDetailDto();
            info.screenerCriteria = this.screenerCritierias[iscreen];
            info.stockScreenerSearchDetail = new StockScreenerSearchDetail();
            info.stockScreenerSearchDetail.screenerCriteriaId = this.screenerCritierias[iscreen].id;
            info.stockScreenerSearchDetail.searchValue = this.searchObjects[this.screenerCritProps[i2]];
            info.stockScreenerSearchDetail.stockScreenerId = this.stockScreenerRec.stockScreener.id ? this.stockScreenerRec.stockScreener.id : 0 ;

            this.stockScreenerRec.stockScreenerSearchDetails.push(info);

          }

        }





      }
    }





    
    this.securityService.UpsertStockScreenerRecord(this.stockScreenerRec).subscribe(screenerCritieriaResults => {
      
      console.log('Test info');
    
      
    });
    
  }


  GetAllScreenerCriterias(): void {


    this.securityService.GetAllScreenerCriterias().subscribe(screenerCritieriaResults => {
      this.screenerCritierias = screenerCritieriaResults;

      for (var i = 0; i < this.screenerCritierias.length; i++) {
        var criteriaName = this.screenerCritierias[i].criteriaName;

        var jsonObjName = this.screenerCritierias[i].jsonObjectName;
        this.criteriaNames[jsonObjName] = criteriaName
        this.searchObjects[jsonObjName] = '';

      
      }


      for (var prop in this.searchObjects) {

        this.screenerCritProps.push(prop);
      }

      this.SetInitialStockScreener();


    });



  }


  SetInitialStockScreener(): void {

    let blanksStockScreen: StockScreenerRecordDto = new StockScreenerRecordDto();

    blanksStockScreen.stockScreener = new StockScreener();
    blanksStockScreen.stockScreener.id = 0;
    let criteriaDetails: ScreeneCriteriaDetailDto[] = []
    blanksStockScreen.stockScreenerSearchDetails =   criteriaDetails
    

    this.stockScreenerRec = blanksStockScreen;
  }

  GetStockScreenerRecord(stockScreenerId): void {
    this.securityService.GetStockScreenerRecord(stockScreenerId).subscribe(priorPurchaseEstimate => {
      this.stockScreenerRec = priorPurchaseEstimate;

      var screenDetailsLength = this.stockScreenerRec.stockScreenerSearchDetails.length;
      for (var i = 0; i < screenDetailsLength; i++) {
        var jsonName = this.stockScreenerRec.stockScreenerSearchDetails[i].screenerCriteria.jsonObjectName;
        var searchValue = this.stockScreenerRec.stockScreenerSearchDetails[i].stockScreenerSearchDetail.searchValue;

        //this.stockScreenerRec.stockScreenerSearchDetails[i].screenerCriteria[jsonName] = searchValue;
        this.stockScreenerSPO[jsonName] = searchValue;

        this.searchObjects[jsonName] = searchValue;

      }
      

      


    });

  }




  RunScreenerSearch(): void {




    let stockScreenerParams: StockScreenerSearchResourceParameters = new StockScreenerSearchResourceParameters();

    this.searchObjects


    var screenCritPropsLen = this.screenerCritProps.length;
    

    for (var i2 = 0; i2 < screenCritPropsLen; i2++) {
      var jsonName = this.screenerCritProps[i2]
       
      stockScreenerParams[jsonName] = this.searchObjects[jsonName];
    }


    this.securityService.GetStockScreenerResult(stockScreenerParams).subscribe(stockOptions => {

      this.stockOptions = stockOptions;


    });
  }

}
