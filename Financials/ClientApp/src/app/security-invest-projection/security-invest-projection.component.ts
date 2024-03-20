import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { Security } from '../interfaces/security';
import { ViewChild } from '@angular/core';
import { InvestProjectionStockFactory } from '../classes/InvestmentProjection/investprojectionstockfactory';
import { InvestProjectionStock } from '../classes/InvestmentProjection/investprojectionstock';
import { investmentprojectionsresourceparameters } from '../interfaces/resourceparameters/investmentprojectionsresourceparameters';
import { investmentprojectionforupdate } from '../interfaces/investmentprojectionforupdate';
import { investmentprojectionforadd } from '../interfaces/investmentprojectionforadd';
import { InvestProjection } from '../classes/InvestmentProjection/investprojection';
@Component({
  selector: 'app-security-invest-projection',
  templateUrl: './security-invest-projection.component.html',
  styleUrls: ['./security-invest-projection.component.css']

})

export class SecurityInvestProjectionComponent implements OnInit {
  currentActionItem = 'populatesecurityid';

  investProjectionStockFactoryList: InvestProjectionStockFactory[];
  investProjectionStockFactory: InvestProjectionStockFactory;
  //investProjectionStocks: InvestProjectionStock[];

 // investProjections: InvestProjection[];
  @ViewChild('myModalClose', { static: false }) modalClose;
  constructor(
    private prefSecurityService: SecurityService) {
    this.investProjectionStockFactory = new InvestProjectionStockFactory();
  }

  isCollapsed: boolean = true;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }


  ngOnInit() {

    let invprojRP: investmentprojectionsresourceparameters = new investmentprojectionsresourceparameters();
    invprojRP.userId = 1;
    this.prefSecurityService.getInvestmentProjectionsSecurities(invprojRP).subscribe(investProjections => {
      this.investProjectionStockFactoryList = [];
      let blankProjectionFactory: InvestProjectionStockFactory = new InvestProjectionStockFactory();
      
      this.investProjectionStockFactoryList.push(blankProjectionFactory);

      var projectionLength = investProjections.length;
      for (var i = 0; i < projectionLength;i++) {
        let projectionFactory: InvestProjectionStockFactory = new InvestProjectionStockFactory();
        projectionFactory.investProjectionModel = investProjections[i];
       this.investProjectionStockFactoryList.push(projectionFactory);
       // this.investProjectionStockFactoryList.push(...investProjections);
      }
      

    });
    

    //this.investProjectionStockFactory.investProjectionStocks.push(investProjectionStock);
  }

  onInvestProjectionChange(value: number): void {
    this.investProjectionStockFactory = new InvestProjectionStockFactory();
    this.selectSavedInvestProjection(Number(value));
  }

  selectSavedInvestProjection(projectionId: number): void {
    this.investProjectionStockFactory = new InvestProjectionStockFactory();

    let index = this.investProjectionStockFactoryList.findIndex(x => x.investProjectionModel.id === projectionId);
    if (index == -1) {
      return;
    }
    

    this.investProjectionStockFactory.investProjectionModel.repeatInvestmentFrequency = this.investProjectionStockFactoryList[index].investProjectionModel.repeatInvestmentFrequency;

    this.investProjectionStockFactory.investProjectionModel.purchaseFrequency = this.investProjectionStockFactoryList[index].investProjectionModel.purchaseFrequency;
    this.investProjectionStockFactory.investProjectionModel.repeatInvestmentAmount = this.investProjectionStockFactoryList[index].investProjectionModel.repeatInvestmentAmount;
    this.investProjectionStockFactory.investProjectionModel.yearRangeHigh = this.investProjectionStockFactoryList[index].investProjectionModel.yearRangeHigh;
    this.investProjectionStockFactory.investProjectionModel.yearRangeLow = this.investProjectionStockFactoryList[index].investProjectionModel.yearRangeLow;
    this.investProjectionStockFactory.investProjectionModel.projectionName = this.investProjectionStockFactoryList[index].investProjectionModel.projectionName;
    this.investProjectionStockFactory.investProjectionModel.id = this.investProjectionStockFactoryList[index].investProjectionModel.id;
    this.investProjectionStockFactory.userId = this.investProjectionStockFactoryList[index].userId;

    var securityLength = this.investProjectionStockFactoryList[index].investProjectionModel.securities.length;
    for (var i = 0; i < securityLength; i++) {
      this.addSecurity(this.investProjectionStockFactoryList[index].investProjectionModel.securities[i].id, securityLength);
    }

    

  }

  newInvestmentProjection(): void {
    
    let investmentprojectionforadddto: investmentprojectionforadd = new investmentprojectionforadd();
    investmentprojectionforadddto.userId = this.investProjectionStockFactory.userId;
    investmentprojectionforadddto.projectionName = this.investProjectionStockFactory.investProjectionModel.projectionName;
    investmentprojectionforadddto.repeatInvestmentAmount = Number(this.investProjectionStockFactory.investProjectionModel.repeatInvestmentAmount);
    investmentprojectionforadddto.repeatInvestmentFrequency = Number(this.investProjectionStockFactory.investProjectionModel.repeatInvestmentFrequency);
    investmentprojectionforadddto.purchaseFrequency = Number(this.investProjectionStockFactory.investProjectionModel.purchaseFrequency);
    investmentprojectionforadddto.yearRangeLow = Number(this.investProjectionStockFactory.investProjectionModel.yearRangeLow);
    investmentprojectionforadddto.yearRangeHigh = Number(this.investProjectionStockFactory.investProjectionModel.yearRangeHigh);
    investmentprojectionforadddto.securities = [];

    let projStockCount = this.investProjectionStockFactory.investProjectionStocks.length;
    for (var i = 0; i < projStockCount; i++) {
      investmentprojectionforadddto.securities.push(this.investProjectionStockFactory.investProjectionStocks[i].securityRecord);
    }


    this.prefSecurityService.addInvestmentProjection(investmentprojectionforadddto).subscribe(prefsecurities => {


      this.investProjectionStockFactory.investProjectionModel.id = Number(prefsecurities);
      let stockCount = this.investProjectionStockFactory.investProjectionStocks.length;

      for (var i = 0; i < stockCount; i++) {
        this.investProjectionStockFactory.investProjectionModel.securities.push(this.investProjectionStockFactory.investProjectionStocks[i].securityRecord);
      }
      

      this.investProjectionStockFactoryList.push(this.investProjectionStockFactory);


    }); 
  }

  peakRangeInfo(): void{
    this.prefSecurityService.GetPeakRangeDetails(251).subscribe(prefsecurities => {

    }); 
  }

  updateInvestmentProjection(): void {
    let investmentprojectionforupdatedto: investmentprojectionforupdate = new investmentprojectionforupdate();

    investmentprojectionforupdatedto.id = this.investProjectionStockFactory.investProjectionModel.id;
    investmentprojectionforupdatedto.userId = this.investProjectionStockFactory.userId;
    investmentprojectionforupdatedto.projectionName = this.investProjectionStockFactory.investProjectionModel.projectionName;
    investmentprojectionforupdatedto.repeatInvestmentAmount = Number(this.investProjectionStockFactory.investProjectionModel.repeatInvestmentAmount);
    investmentprojectionforupdatedto.repeatInvestmentFrequency = Number(this.investProjectionStockFactory.investProjectionModel.repeatInvestmentFrequency);
    investmentprojectionforupdatedto.purchaseFrequency = Number(this.investProjectionStockFactory.investProjectionModel.purchaseFrequency);
    investmentprojectionforupdatedto.yearRangeLow = Number(this.investProjectionStockFactory.investProjectionModel.yearRangeLow);
    investmentprojectionforupdatedto.yearRangeHigh = Number(this.investProjectionStockFactory.investProjectionModel.yearRangeHigh);
    investmentprojectionforupdatedto.securities = [];

    let projStockCount = this.investProjectionStockFactory.investProjectionStocks.length;
    for (var i = 0; i < projStockCount; i++) {
      investmentprojectionforupdatedto.securities.push(this.investProjectionStockFactory.investProjectionStocks[i].securityRecord);
    }


    this.prefSecurityService.updateInvestmentProjection(investmentprojectionforupdatedto).subscribe(prefsecurities => {

    });

  }
  newCalculation(): void {

    this.investProjectionStockFactory = new InvestProjectionStockFactory();

  }


  deleteCalculations(): void {
    let investmentProjectionId: number = this.investProjectionStockFactory.investProjectionModel.id;
    if (investmentProjectionId > 0) {
      this.prefSecurityService.deleteInvestmentProjection(investmentProjectionId).subscribe(security => {
        this.investProjectionStockFactory = new InvestProjectionStockFactory();

        let index = this.investProjectionStockFactoryList.findIndex(x => x.investProjectionModel.id === investmentProjectionId);
        if (index > -1) {
          this.investProjectionStockFactoryList.splice(index, 1);
        }


      });
    } else {
      this.investProjectionStockFactory = new InvestProjectionStockFactory();
    }

    
  }

  saveCalculations(): void {

    if (this.investProjectionStockFactory.investProjectionModel.id > 0) {
      this.updateInvestmentProjection();
    } else {
      this.newInvestmentProjection();
    }
   
  }
  addSecurity(securityId: number, securityLength: number): void {
     this.prefSecurityService.getSecurity(securityId)
      .subscribe(security => {
        this.setSecurityId(security, securityLength);
      });
  }

  refreshCalculations(): void {

    if (this.investProjectionStockFactory.investProjectionStocks.length == 0) {
      //alert("Select A Security");
      return;
    }
    

    this.investProjectionStockFactory.UpdateStockPrices();
    
    
    
  }


  removeStock(securityId: number) {
    let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === securityId);
    if (index > -1) {
        this.investProjectionStockFactory.investProjectionStocks.splice(index, 1);
    }


    var securityLength = this.investProjectionStockFactory.investProjectionStocks.length;
    this.investProjectionStockFactory.investProjectionModel.totalStocks = securityLength;
    
    for (var i = 0; i < securityLength; i++) {
      this.investProjectionStockFactory.investProjectionStocks[i].investProjectionModel = this.investProjectionStockFactory.investProjectionModel;

      this.investProjectionStockFactory.investProjectionStocks[i].UpdateStockPrices();
    }





  }


  setSecurityId(security: Security, securityLength: number) {
   // this.securityId = security.id;

    let index = this.investProjectionStockFactory.investProjectionStocks.findIndex(x => x.securityRecord.id === security.id);
    if (index == -1) {

      if (securityLength) {
        this.investProjectionStockFactory.investProjectionModel.totalStocks = securityLength;
        let investProjectionStock: InvestProjectionStock = new InvestProjectionStock(this.prefSecurityService, this.investProjectionStockFactory.investProjectionModel);
        investProjectionStock.securityRecord = security;

        this.investProjectionStockFactory.investProjectionStocks.push(investProjectionStock);
        if (securityLength == this.investProjectionStockFactory.investProjectionStocks.length) {


          for (var i = 0; i < securityLength; i++) {
            this.investProjectionStockFactory.investProjectionStocks[i].RetrieveStockData();
          }


        }
      }
      else {

        this.investProjectionStockFactory.investProjectionModel.totalStocks = this.investProjectionStockFactory.investProjectionStocks.length + 1;
        let investProjectionStock: InvestProjectionStock = new InvestProjectionStock(this.prefSecurityService, this.investProjectionStockFactory.investProjectionModel);
        investProjectionStock.securityRecord = security;

        this.investProjectionStockFactory.investProjectionStocks.push(investProjectionStock);
        securityLength = this.investProjectionStockFactory.investProjectionStocks.length
        for (var i = 0; i < securityLength - 1; i++) {
          this.investProjectionStockFactory.investProjectionStocks[i].investProjectionModel = this.investProjectionStockFactory.investProjectionModel;
            this.investProjectionStockFactory.investProjectionStocks[i].UpdateStockPrices();
        }
        this.investProjectionStockFactory.investProjectionStocks[securityLength-1].RetrieveStockData();
      }
      
     
    }
    // this.modalClose.nativeElement.click();
    
  }

 


  
}
