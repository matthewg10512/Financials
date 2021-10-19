import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { AutoSecurityTradeSecurity } from '../interfaces/autosecuritytradesecurity';
import { securitydate } from '../interfaces/securitydate';
import { autosecuritytradesresourceparameters } from '../interfaces/autosecuritytradesresourceparameters';
import { StockTranHistory } from '../interfaces/stockTranHistory';
import { autosecuritytradegroup } from '../interfaces/autosecuritytradegroup';

@Component({
  selector: 'app-auto-security-trade',
  templateUrl: './auto-security-trade.component.html',
  styleUrls: ['./auto-security-trade.component.css']
})


export class AutoSecurityTradeComponent implements OnInit {


  autoSecurityTradeGroups: autosecuritytradegroup[]=[];

//let index = a.findIndex(x => x.LastName === "Skeet");
//console.log(index);


  autoSecurityTradeSecurities: AutoSecurityTradeSecurity[];
  stockTranHistory: StockTranHistory[];

  public tranType: string[] = ["All", "Sold", "UnSold"];
  selectedQuantity = "All";
  
  public amountToBuy: number = 1000;
  public maxInvestment: number;
  public currentInvestment: number;

  values: (string | number)[];


  public purOptions: string[] = ["Dollars", "Shares"]
  selectedPurchaseType = "Dollars";
  totEarned: number;
  totLost: number;
  constructor(


    private securityService: SecurityService,
  ) { }



  
  ngOnInit() {

    this.GetAutoSecurityTrades();

   // this.selectedPositionsSoldOptions = 0;
  }




  formatDates(): void {
    let securityLength = this.autoSecurityTradeSecurities.length;

    for (var i = 0; i < securityLength; i++) {
      if (this.autoSecurityTradeSecurities[i].sellDate) {
        var sellDate = new Date(this.autoSecurityTradeSecurities[i].sellDate);
        sellDate.setHours(sellDate.getHours() - 4);
        this.autoSecurityTradeSecurities[i].sellDate = sellDate;
        var sellSecurityDate = this.setFormatDate(sellDate);

      }
      var purDate = new Date(this.autoSecurityTradeSecurities[i].purchaseDate);
      purDate.setHours(purDate.getHours() - 4);
      this.autoSecurityTradeSecurities[i].purchaseDate = purDate;
    }
  }

  CalculateTotals(): void {
    this.autoSecurityTradeGroups = [];
    var totalEarned = 0;
    var totalLost = 0;
    var sharesDropped;
    let securityLength = this.autoSecurityTradeSecurities.length;
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 50);


    this.maxInvestment = 0;
    this.currentInvestment = 0;



    


    var curDate = this.setFormatDate(currentDate); 

    var stockDates = new Array();

    var stockRecords = new Array();

    this.stockTranHistory = [];

    for (var i = 0; i < securityLength; i++) {

     

      //var purDate = new Date(this.autoSecurityTradeSecurities[i].purchaseDate);
      //purDate.setHours(purDate.getHours() - 4);
      //this.autoSecurityTradeSecurities[i].purchaseDate = purDate;

      

     // var purSecurityDate = this.setFormatDate(purDate); 


      this.GroupSecurityDetails(i);

      
      

      var sharesDropped;
      if (this.autoSecurityTradeSecurities[i].sellDate) {
        //security hasn't been sold yet so
        if (this.selectedPurchaseType == "Dollars") {
          sharesDropped = (this.amountToBuy / this.autoSecurityTradeSecurities[i].purchasePrice);
        }
        else {
          sharesDropped = this.amountToBuy;
        }
        
        totalEarned += (this.autoSecurityTradeSecurities[i].sellPrice - this.autoSecurityTradeSecurities[i].purchasePrice) * sharesDropped * this.autoSecurityTradeSecurities[i].percentageLevel;
      }
      else {
        if (this.selectedPurchaseType == "Dollars") {
          sharesDropped = (this.amountToBuy / this.autoSecurityTradeSecurities[i].purchasePrice)
        } else {
          sharesDropped = this.amountToBuy;
        }
        totalLost += (this.autoSecurityTradeSecurities[i].security.currentPrice - this.autoSecurityTradeSecurities[i].purchasePrice) * sharesDropped * this.autoSecurityTradeSecurities[i].percentageLevel;
      }
      let selectRec: securitydate = stockRecords[curDate];

      //this.autoSecurityTradeSecurities[i].totalamount = selectRec.amountBought - selectRec.amountSold;
      let stockTranPurHisRec: StockTranHistory = {
        priceLevel: this.autoSecurityTradeSecurities[i].percentageLevel,
        tranDate: this.autoSecurityTradeSecurities[i].purchaseDate,
        tranType: 0, investedAmount: 0, purchasePrice: this.autoSecurityTradeSecurities[i].purchasePrice 
      }
      this.stockTranHistory.push(stockTranPurHisRec);


      if (this.autoSecurityTradeSecurities[i].sellDate) {
        let stockTranSellHisRec: StockTranHistory = {
          priceLevel: this.autoSecurityTradeSecurities[i].percentageLevel,
          tranDate: this.autoSecurityTradeSecurities[i].sellDate, tranType: 1, investedAmount: 0, purchasePrice: this.autoSecurityTradeSecurities[i].purchasePrice 
        }
        this.stockTranHistory.push(stockTranSellHisRec);
      }
    }

    
    this.stockTranHistory.sort((a, b) => new Date(a.tranDate).getTime() - new Date(b.tranDate).getTime());


    this.autoSecurityTradeGroups.sort((a, b) => (a.totalSold - a.totalBought) - (b.totalSold - b.totalBought));


    let tranLen = this.stockTranHistory.length;
    var maxSpent=0;
    var currentInMarket=0;
    for (var i = 0; i < tranLen; i++) {
      if (this.stockTranHistory[i].tranType === 0) {
        if (this.selectedPurchaseType == "Dollars") {
          currentInMarket += this.stockTranHistory[i].priceLevel * this.amountToBuy
        } else {
          currentInMarket += this.stockTranHistory[i].priceLevel * this.stockTranHistory[i].purchasePrice * this.amountToBuy
        }
      } else {
        if (this.selectedPurchaseType == "Dollars") {
          currentInMarket -= this.stockTranHistory[i].priceLevel * this.amountToBuy
        }
        else {
          currentInMarket -= this.stockTranHistory[i].priceLevel * this.stockTranHistory[i].purchasePrice * this.amountToBuy
        }
      }
      if (maxSpent < currentInMarket) {
        maxSpent = currentInMarket;
      }
      this.stockTranHistory[i].investedAmount = currentInMarket;
      
    }

    this.maxInvestment = maxSpent;
    this.currentInvestment = currentInMarket;

    for (var i = 0; i < securityLength; i++) {

      for (var i2 = 0; i2 < tranLen; i2++) {
        if (this.autoSecurityTradeSecurities[i].purchaseDate == this.stockTranHistory[i2].tranDate) {
          this.autoSecurityTradeSecurities[i].totalamount = this.stockTranHistory[i2].investedAmount;
          break;
        }

      }
      


    }

    this.totEarned = totalEarned;
    this.totLost = totalLost;
    

  }
  GroupSecurityDetails(i: number): void {

    let costPurchase: number = 0;
    let costSell: number = 0;
    let sharesBought: number;
    if (this.selectedPurchaseType == "Dollars") {

      sharesBought = this.amountToBuy / this.autoSecurityTradeSecurities[i].purchasePrice;
      costPurchase = this.amountToBuy;
    } else {
      sharesBought = this.amountToBuy;
      costPurchase = sharesBought * this.autoSecurityTradeSecurities[i].purchasePrice;
    }


    if (this.autoSecurityTradeSecurities[i].sellDate) {
      costSell = sharesBought * this.autoSecurityTradeSecurities[i].sellPrice;
    }
    else {
      costSell = sharesBought * this.autoSecurityTradeSecurities[i].security.currentPrice;
    }

    let index = this.autoSecurityTradeGroups.findIndex(x => x.securityName === this.autoSecurityTradeSecurities[i].security.name);
    if (index > -1) {
      let autoSecTradeGroup: autosecuritytradegroup = this.autoSecurityTradeGroups[index];
      autoSecTradeGroup.tradeCount += 1;
      autoSecTradeGroup.totalBought += Number(costPurchase);
      autoSecTradeGroup.totalSold += Number(costSell);
      if (!this.autoSecurityTradeSecurities[i].sellDate) {
        autoSecTradeGroup.currentShares = autoSecTradeGroup.currentShares + Number(sharesBought);
        autoSecTradeGroup.sharePrices = autoSecTradeGroup.sharePrices + (Number(this.autoSecurityTradeSecurities[i].purchasePrice) * Number(sharesBought));
      }

      this.autoSecurityTradeGroups[index] = autoSecTradeGroup;

    }
    else {
      let autoSecTradeGroup: autosecuritytradegroup = new autosecuritytradegroup();
      autoSecTradeGroup.securityName = this.autoSecurityTradeSecurities[i].security.name
      autoSecTradeGroup.tradeCount = 1;
      autoSecTradeGroup.totalBought = Number(costPurchase);
      autoSecTradeGroup.totalSold = Number(costSell);
      if (!this.autoSecurityTradeSecurities[i].sellDate) {
        autoSecTradeGroup.currentShares = Number(sharesBought);
        autoSecTradeGroup.sharePrices = Number(this.autoSecurityTradeSecurities[i].purchasePrice) * Number(sharesBought);
      }
      else {
        autoSecTradeGroup.currentShares = 0;
        autoSecTradeGroup.sharePrices = 0;

      }
      autoSecTradeGroup.currentPrice = this.autoSecurityTradeSecurities[i].security.currentPrice;

      this.autoSecurityTradeGroups.push(autoSecTradeGroup);
    }


  }
  setFormatDate(date: Date): string {
    var month = date.getMonth() + 1;//months (0-11)
    var day = (date.getDate());//day (1-31)
    var year = date.getFullYear();
    return month + "-" + day + "-" + year;

     
  }
  GetAutoSecurityTrades(): void {
    let autosecuritytradesresourceparameter: autosecuritytradesresourceparameters = new autosecuritytradesresourceparameters();
    autosecuritytradesresourceparameter.positionSold = this.selectedQuantity;
    this.securityService.searchAutoSecurityTrades(autosecuritytradesresourceparameter).subscribe(result => {
      this.autoSecurityTradeSecurities = result;

      this.autoSecurityTradeSecurities.sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());
      this.formatDates();
      this.CalculateTotals();
    }, error => {

    })




  }
  refreshCalculations(): void {
    this.CalculateTotals();
  }


  searchAutoTrades(): void {
    


    let autosecuritytradesresourceparameter:  autosecuritytradesresourceparameters  = new autosecuritytradesresourceparameters();

    
    autosecuritytradesresourceparameter.positionSold = this.selectedQuantity;
     
    this.securityService.searchAutoSecurityTrades(autosecuritytradesresourceparameter).subscribe(result => {
      this.autoSecurityTradeSecurities = result;

      this.autoSecurityTradeSecurities.sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());
      this.formatDates();
      this.CalculateTotals();
    }, error => {

    })
    
  }

 

  selected() {
    //console.log(this.selectedLevel)
  }

}


/*
      if (curDate != purSecurityDate) {
        stockDates.push(purSecurityDate)
        curDate = purSecurityDate;

        let securityDateRec: securitydate = { amountBought: 1000 * this.autoSecurityTradeSecurities[i].sharesBought,amountSold:0};
        //securityDateRec.amountSold = 0;
        stockRecords[curDate] = securityDateRec;

        //stockLoad.amountBought
       // stockDates.amountSold
      }
      else {
        let selectRecord: securitydate = stockRecords[curDate];
        selectRecord.amountBought += 1000 * this.autoSecurityTradeSecurities[i].sharesBought;
        stockRecords[curDate] = selectRecord;
      }


      if (this.autoSecurityTradeSecurities[i].sellDate) {
        var sellDate = new Date(this.autoSecurityTradeSecurities[i].sellDate);
        sellDate.setHours(sellDate.getHours() - 4);
        this.autoSecurityTradeSecurities[i].sellDate = sellDate;
        var sellSecurityDate = this.setFormatDate(sellDate);
        if (stockRecords[sellSecurityDate]) {
          let selectRecord: securitydate = stockRecords[curDate];
          selectRecord.amountSold += 1000 * this.autoSecurityTradeSecurities[i].sharesBought;
          stockRecords[sellSecurityDate] = selectRecord;

        } else {
          let securityDateRec: securitydate = { amountBought: 0, amountSold: 1000 * this.autoSecurityTradeSecurities[i].sharesBought };
          //securityDateRec.amountBought = 0;
          //securityDateRec.amountSold = 1000 * this.autoSecurityTradeSecurities[i].sharesBought;
          stockRecords[sellSecurityDate] = securityDateRec;
        }
      }

      */
