import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { SecurityService } from '../services/security.service';
import { earningresourceparameters } from '../interfaces/earningresourceparameters';
import { EarningSecurity } from '../interfaces/earningsecurity';



@Component({
  selector: 'earning-component',
  templateUrl: './earning-component.html',
  styleUrls: ['./earning-component.css']
})
export class EarningComponent implements OnInit  {
  // Array of different segments in chart
  earnings: EarningSecurity[];
  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    this.getEarnings(true); 
  }

  updateFutureEarnings(): void {


    this.securityService.updateFutureEarnings().subscribe(result => {
      this.getEarnings(false);
    }, error => {

    })

  }

  getEarnings(updateEarnings: boolean): void {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    var currentdateDetail = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    var futuredateDetail = (futureDate.getMonth() + 1) + '/' + futureDate.getDate() + '/' + futureDate.getFullYear();



    let earningParams: earningresourceparameters = new earningresourceparameters(); 
    earningParams.rangeStartEarningsDate = currentdateDetail;
    earningParams.rangeEndEarningsDate = futuredateDetail;
    this.securityService.searchEarnings(earningParams).subscribe(result => {
      this.earnings = result;
      
      if (updateEarnings) {
        this.updateFutureEarnings();
      }
    }, error => {

    })
  }

  //updateFutureEarnings():

}

