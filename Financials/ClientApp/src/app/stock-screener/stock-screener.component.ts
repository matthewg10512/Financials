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
import { StockScreenerAlertsHistorySearchResourceParameters } from '../interfaces/resourceparameters/StockScreenerAlertsHistorySearchResourceParameters';
import { StockScreenerAlertsHistory } from '../interfaces/StockScreenerAlertsHistory';
import { StockScreenerAlertsHistorySecurityJoin } from '../interfaces/StockScreenerAlertsHistorySecurityJoinDto';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockScreenerAlertType } from '../interfaces/stockscreener/StockScreenerAlertType';

@Component({
  selector: 'app-stock-screener',
  templateUrl: './stock-screener.component.html',
  styleUrls: ['./stock-screener.component.css']
})
export class StockScreenerComponent implements OnInit {

  percentDropTypesList: any[] = [];
  calculatedPercentDropTypeList: any[] = [];

  screenerAlertType: any[] = [];
  isCollapsed: boolean = true;
  sortNameDesc: boolean = false;

  date: any;
  stockScreenersAlertTypes: StockScreenerAlertType[];
  confirmDeleteStockScreener: boolean = false;
  stockScreenerFrequencyTypes: any[] = [] ;
  screenerCritierias: ScreenerCriteria[];

  templateScreenerCritierias: ScreenerCriteria[];
  

  stockScreenAlertsHistoryParams: StockScreenerAlertsHistorySearchResourceParameters;

  
  stockScreenerRec: StockScreenerRecordDto;

  alertsSecurityHistory: StockScreenerAlertsHistorySecurityJoin[]
  
  stockScreeners: StockScreener[];
  stockScreenerParams: StockScreenerSearchResourceParameters = new StockScreenerSearchResourceParameters();
  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    var d = new Date;
    d.setDate(d.getDate() - 1);
    this.GetStockScreenerAlertTypes();


    this.GetAllScreenerCriterias();
    
    this.SetupDropLists();
    this.GetStockScreeners()
    var dt = new Date;
   
    this.stockScreenAlertsHistoryParams = new StockScreenerAlertsHistorySearchResourceParameters();
    //Tue Feb 01 2022 21:16:02 GMT-0500 (Eastern Standard Time) {}
    
    this.stockScreenAlertsHistoryParams.alertDate = new Date(dt.toDateString());
    //Tue Feb 01 2022 00: 00: 00 GMT - 0500(Eastern Standard Time) { }
  }


  GetStockScreenerAlertTypes(): void{

    this.securityService.GetStockScreenerAlertTypes().subscribe(stockScreenersAlertTypes => {
      this.stockScreenersAlertTypes = stockScreenersAlertTypes;
    });


}

  GetStockScreeners(): void {

    this.securityService.GetStockScreeners().subscribe(stockScreeners => {
      this.stockScreeners = stockScreeners;
    });
    
  }

  sortByName(): void {
    if (this.sortNameDesc) {
      this.alertsSecurityHistory.sort((a, b) => a.security.name.localeCompare(b.security.name));

    } else {
      this.alertsSecurityHistory.sort((a, b) => b.security.name.localeCompare(a.security.name));
    }
    this.sortNameDesc = !this.sortNameDesc;
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

    this.AddCalcPercentDropList('averagetimesoneandhalfpercent', '(150%) from Average Drop');
    this.AddCalcPercentDropList('averagedroplowaverage', 'Avg Drop Below Average Drop');
    this.AddCalcPercentDropList('percentile5', '5th Percentile of Droppers');
    this.AddCalcPercentDropList('percentile10', '10th Percentile of Dropper');
    this.AddCalcPercentDropList('percentile15', '15th Percentile of  Dropper');
    
    this.AddFrequencyTypeList(1, 'Instant');
    this.AddFrequencyTypeList(2, 'Hourly');
    this.AddFrequencyTypeList(3, 'Daily');
    this.AddFrequencyTypeList(4, 'Weekly');

  }


  DeleteStockScreener(): void {


    if (!this.confirmDeleteStockScreener) {
      return;
    }

    if (this.stockScreenerRec.stockScreener.id && this.stockScreenerRec.stockScreener.id > 0) {
      this.securityService.DeleteStockScreener(this.stockScreenerRec.stockScreener.id).subscribe(security => {
        this.ResetStockScreenerRecord();
        this.GetStockScreeners();
    
      

    });

    }
  }

  AddFrequencyTypeList(id: number, frequencyType: string):void {


    let frequencyTypeRec: any = {};
    frequencyTypeRec.id = id;
    frequencyTypeRec.frequencyType = frequencyType;

    this.stockScreenerFrequencyTypes.push(frequencyTypeRec)
    
  }

  AddCalcPercentDropList(id: string, name: string): void {

    let calcPercentDropRec: any = {};
    calcPercentDropRec.id = id;
    calcPercentDropRec.name = name;

    this.calculatedPercentDropTypeList.push(calcPercentDropRec)
  }

  ResetStockScreenerRecord(): void {


    this.stockScreenerRec = new StockScreenerRecordDto();

    this.GetAllScreenerCriterias();
    this.confirmDeleteStockScreener = false;
  }


  UpsertStockScreenerRecord(): void {
    var screenCritLen = this.screenerCritierias.length;
    var detailLen = this.stockScreenerRec.stockScreenerSearchDetails.length;

    for (var i2 = 0; i2 < screenCritLen;i2++) {
      let criteriaFound: boolean = false;
      
      for (var i = 0; i < detailLen; i++) {
        var jsonName = this.stockScreenerRec.stockScreenerSearchDetails[i].screenerCriteria.jsonObjectName;  
        if (jsonName == this.screenerCritierias[i2].jsonObjectName) {

          if (this.screenerCritierias[i2].objectType == 'date') {
            this.stockScreenerRec.stockScreenerSearchDetails[i].stockScreenerSearchDetail.searchValue =
              this.screenerCritierias[i2].dateValue ?
                (this.screenerCritierias[i2].dateValue.getMonth() + 1) + '/' + this.screenerCritierias[i2].dateValue.getDate() + '/' + this.screenerCritierias[i2].dateValue.getFullYear() : '';
              
          }
          else if (this.screenerCritierias[i2].objectType == 'bool') {
            this.stockScreenerRec.stockScreenerSearchDetails[i].stockScreenerSearchDetail.searchValue = this.screenerCritierias[i2].boolValue + '';
          } else {
            this.stockScreenerRec.stockScreenerSearchDetails[i].stockScreenerSearchDetail.searchValue = this.screenerCritierias[i2].value + '';
          }
          criteriaFound = true;
        }
      
      }
      if (!criteriaFound) {
        var screenLength = this.screenerCritierias.length;
        for (var iscreen = 0; iscreen < screenLength; iscreen++) {

          if (this.screenerCritierias[iscreen].jsonObjectName == this.screenerCritierias[i2].jsonObjectName) {
            let info: ScreeneCriteriaDetailDto = new ScreeneCriteriaDetailDto();
            info.screenerCriteria = this.screenerCritierias[iscreen];
            info.stockScreenerSearchDetail = new StockScreenerSearchDetail();
            info.stockScreenerSearchDetail.screenerCriteriaId = this.screenerCritierias[iscreen].id;
            info.stockScreenerSearchDetail.stockScreenerId = this.stockScreenerRec.stockScreener.id ? this.stockScreenerRec.stockScreener.id : 0;

            if (this.screenerCritierias[iscreen].objectType == 'date') {
              info.stockScreenerSearchDetail.searchValue =
                this.screenerCritierias[i2].dateValue ?
                  (this.screenerCritierias[i2].dateValue.getMonth() + 1) + '/' + this.screenerCritierias[i2].dateValue.getDate() + '/' + this.screenerCritierias[i2].dateValue.getFullYear() : '';

            }
           else if (this.screenerCritierias[iscreen].objectType == 'bool') {
              info.stockScreenerSearchDetail.searchValue = this.screenerCritierias[i2].boolValue + '';
            } else {
              info.stockScreenerSearchDetail.searchValue = this.screenerCritierias[i2].value + '';
            }

            this.stockScreenerRec.stockScreenerSearchDetails.push(info);
          }
        }
      }
    }


    this.stockScreenerRec.stockScreener.frequency = Number(this.stockScreenerRec.stockScreener.frequency);
    this.stockScreenerRec.stockScreener.alertType = Number(this.stockScreenerRec.stockScreener.alertType);


    if (!this.stockScreenerRec.stockScreener.frequency || !this.stockScreenerRec.stockScreener.alertType ||
      !this.stockScreenerRec.stockScreener.name
    ) {
      alert("Enter all in required fields");
      return;
    }

    
    this.securityService.UpsertStockScreenerRecord(this.stockScreenerRec).subscribe(screenerCritieriaResults => {
      console.log('Test info');
      this.ResetStockScreenerRecord();
      this.GetStockScreeners();
    });
    
  }


  GetAllScreenerCriterias(): void {
    this.securityService.GetAllScreenerCriterias().subscribe(screenerCritieriaResults => {
      this.templateScreenerCritierias = screenerCritieriaResults;
      for (var i = 0; i < this.templateScreenerCritierias.length; i++) {
        this.templateScreenerCritierias[i].value = '';
        this.templateScreenerCritierias[i].boolValue = false;
        
      }
      this.templateScreenerCritierias.sort((a, b) => a.sortPriority - b.sortPriority);
      
      this.screenerCritierias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
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


  SetStockScreenerAlertHistory(stockScreenerId: number): void {
    this.stockScreenAlertsHistoryParams.stockScreenerId = stockScreenerId;
    this.GetStockScreenerAlertHistory();
  }

  GetStockScreenerAlertHistory(): void {
    

    this.securityService.SearchStockScreenerAlertsHistory(this.stockScreenAlertsHistoryParams).subscribe(searchStockScreenerAlertsHistory => {
      this.alertsSecurityHistory = searchStockScreenerAlertsHistory;
      this.alertsSecurityHistory.sort((a, b) => new Date(a.stockScreenerAlertsHistory.dateRecorded).getTime() - new Date(b.stockScreenerAlertsHistory.dateRecorded).getTime());
    });

  }



  GetStockScreenerRecord(stockScreenerId): void {

    this.screenerCritierias = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
    this.securityService.GetStockScreenerRecord(stockScreenerId).subscribe(priorPurchaseEstimate => {
      this.stockScreenerRec = priorPurchaseEstimate;

      var screenDetailsLength = this.stockScreenerRec.stockScreenerSearchDetails.length;
      for (var i = 0; i < screenDetailsLength; i++) {
        var jsonName = this.stockScreenerRec.stockScreenerSearchDetails[i].screenerCriteria.jsonObjectName;
        var searchValue = this.stockScreenerRec.stockScreenerSearchDetails[i].stockScreenerSearchDetail.searchValue;
        //this.stockScreenerSPO[jsonName] = searchValue;
        for (var i2 = 0; i2 < this.screenerCritierias.length; i2++) {
          if (this.screenerCritierias[i2].jsonObjectName == jsonName) {

            if (this.screenerCritierias[i2].objectType == 'date') {
              this.screenerCritierias[i2].dateValue = (searchValue != '' ? new Date(searchValue) : null); 
            }
            else if (this.screenerCritierias[i2].objectType == 'bool') {
              this.screenerCritierias[i2].boolValue = (searchValue == 'true' ? true : false);
            } else {
              this.screenerCritierias[i2].value = searchValue;
            }
          }
        }
      }
    });

  }


}
