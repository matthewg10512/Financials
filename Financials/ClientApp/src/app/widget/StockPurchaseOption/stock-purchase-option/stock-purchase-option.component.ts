import { Component, OnInit, Input } from '@angular/core';
import { StockPurchaseOptionsResourceParameters } from '../../../interfaces/resourceparameters/StockPurchaseOptionsResourceParameters';
import { SecurityService } from '../../../services/security.service';
import { StockPurchaseOption } from '../../../interfaces/StockPurchaseOption';
import { ScreeneCriteriaDetailDto } from '../../../interfaces/stockscreener/ScreeneCriteriaDetailDto';
import { ScreenerCriteria } from '../../../interfaces/stockscreener/ScreenerCriteria';
import { StockScreenerSearchResourceParameters } from '../../../interfaces/resourceparameters/StockScreenerSearchResourceParameters';

@Component({
  selector: 'app-stock-purchase-option',
  templateUrl: './stock-purchase-option.component.html',
  styleUrls: ['./stock-purchase-option.component.css']
})
export class StockPurchaseOptionComponent implements OnInit {
  
  public stockPurchaseOptions: StockPurchaseOption[];
  
  @Input() stockScreenerSearchResourceParameters: StockScreenerSearchResourceParameters;
  @Input() stockScreenerSearchCritieria: ScreenerCriteria[];


  templateScreenerCritierias: ScreenerCriteria[];
  percentDropTypesList: any[] = [];
  calculatedPercentDropTypeList: any[] = [];
  @Input() purOptionTabNum: number;
  sortNameDesc = false;
  sortPercentDesc = false;
  sortPercentCurPerFromHigh = false;
  constructor(private securityService: SecurityService) { }

  ngOnInit() {

    this.processStockPurchaseOptions();
    this.SetupDropLists();
    
  }



  GetAllScreenerCriterias(): void {
    this.securityService.GetAllScreenerCriterias().subscribe(screenerCritieriaResults => {
      this.templateScreenerCritierias = screenerCritieriaResults;
      for (var i = 0; i < this.templateScreenerCritierias.length; i++) {
        this.templateScreenerCritierias[i].value = '';
        this.templateScreenerCritierias[i].boolValue = false;

      }
      this.templateScreenerCritierias.sort((a, b) => a.sortPriority - b.sortPriority);
      if (!this.stockScreenerSearchCritieria) {
        this.stockScreenerSearchCritieria = JSON.parse(JSON.stringify(this.templateScreenerCritierias));
      }
      this.processStockPurchaseOptions();
    });



  }

  processStockPurchaseOptions(): void {

    if (!this.stockScreenerSearchResourceParameters) {
      this.stockScreenerSearchResourceParameters = new StockScreenerSearchResourceParameters();
    }



    //stockScreenerSearchCritieria

    

      if (!this.stockScreenerSearchCritieria) {
        this.stockPurchaseOptions = [];
        this.GetAllScreenerCriterias();
        return;

      }
      var stockScreenerLen = this.stockScreenerSearchCritieria.length;
      var noValues = true;
      for (var i = 0; i < stockScreenerLen; i++) {
        if (this.stockScreenerSearchCritieria[i].value) {
          noValues = false;
          break;
        }
      }

      if (noValues) {
        this.stockPurchaseOptions = [];
        return;
      }
      var screenCritLen = this.stockScreenerSearchCritieria.length;

      for (var i2 = 0; i2 < screenCritLen; i2++) {
        var jsonName = this.stockScreenerSearchCritieria[i2].jsonObjectName

        if (this.stockScreenerSearchCritieria[i2].objectType == 'date' && this.stockScreenerSearchCritieria[i2].dateValue) {
          this.stockScreenerSearchResourceParameters[jsonName] =
            (this.stockScreenerSearchCritieria[i2].dateValue.getMonth() + 1) + '/' + this.stockScreenerSearchCritieria[i2].dateValue.getDate() + '/' + this.stockScreenerSearchCritieria[i2].dateValue.getFullYear();
        }
        else if (this.stockScreenerSearchCritieria[i2].objectType == 'bool') {
          this.stockScreenerSearchResourceParameters[jsonName] = this.stockScreenerSearchCritieria[i2].boolValue + '';
          
        } else {
          this.stockScreenerSearchResourceParameters[jsonName] = this.stockScreenerSearchCritieria[i2].value;
        }
      }

      this.stockPurchaseOptions = null;
      this.securityService.GetStockScreenerResult(this.stockScreenerSearchResourceParameters).subscribe(stockPurchaseOptions => {
        this.stockPurchaseOptions = stockPurchaseOptions;

        var purchaseOptionsCount = this.stockPurchaseOptions.length;
        for (var i = 0; i < purchaseOptionsCount; i++) {
          this.stockPurchaseOptions[i].peakRangeDetail.sort((a, b) => Number(a.rangeName.substring(0, 2).replace('%', '')) - Number(b.rangeName.substring(0, 2).replace('%', '')));
        }
      });



    

    /*
    else {

      this.stockPurchaseOptions = null;
      this.securityService.getStockPurchaseOptions(this.stockPurchaseOptResourceParams).subscribe(stockPurchaseOptions => {
        this.stockPurchaseOptions = stockPurchaseOptions;

        var purchaseOptionsCount = this.stockPurchaseOptions.length;
        for (var i = 0; i < purchaseOptionsCount; i++) {
          this.stockPurchaseOptions[i].peakRangeDetail.sort((a, b) => Number(a.rangeName.substring(0, 2).replace('%', '')) - Number(b.rangeName.substring(0, 2).replace('%', '')));
        }
      });
    }
    */

  }

  sortByPercentage (): void {
    if (!this.sortPercentDesc) {
      this.stockPurchaseOptions.sort((a, b) => a.security.percentageChange - b.security.percentageChange);
    }
    else {
      this.stockPurchaseOptions.sort((a, b) => b.security.percentageChange - a.security.percentageChange);
    }
    this.sortPercentDesc = !this.sortPercentDesc;
  }
  sortByName(): void {
    if (!this.sortNameDesc) {
      this.stockPurchaseOptions.sort((a, b) => a.security.name.localeCompare(b.security.name));
    }
    else {
      this.stockPurchaseOptions.sort((a, b) => b.security.name.localeCompare(a.security.name));
    }
    this.sortNameDesc = !this.sortNameDesc;
  }


  sortByCurPerFromHigh(): void {
    if (!this.sortPercentCurPerFromHigh) {
      this.stockPurchaseOptions.sort((a, b) => ((a.security.currentPrice - a.currentPeakRange.lastOpenHigh) / a.currentPeakRange.lastOpenHigh )
        -
        ((b.security.currentPrice - b.currentPeakRange.lastOpenHigh) / b.currentPeakRange.lastOpenHigh)
      );
    }
    else {
      this.stockPurchaseOptions.sort((a, b) => ((b.security.currentPrice - b.currentPeakRange.lastOpenHigh) / b.currentPeakRange.lastOpenHigh)
        -
        ((a.security.currentPrice - a.currentPeakRange.lastOpenHigh) / a.currentPeakRange.lastOpenHigh)
      );
    }
    this.sortPercentCurPerFromHigh = !this.sortPercentCurPerFromHigh;
  }



  SetupDropLists(): void {



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



  }


  AddCalcPercentDropList(id: string, name: string): void {

    let calcPercentDropRec: any = {};
    calcPercentDropRec.id = id;
    calcPercentDropRec.name = name;

    this.calculatedPercentDropTypeList.push(calcPercentDropRec)
  }
}
