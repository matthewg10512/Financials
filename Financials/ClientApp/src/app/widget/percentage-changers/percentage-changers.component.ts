import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Security } from '../../interfaces/security';
import { SecurityResourceParameters } from '../../interfaces/securityresourceparameters';

@Component({
  selector: 'widget-percentage-changers',
  templateUrl: './percentage-changers.component.html',
  styleUrls: ['./percentage-changers.component.css']
})
export class PercentageChangersComponent implements OnInit {
  weekLowSecurities: Security[];

  public perChange52Week: number = 15;


  constructor(private securityService: SecurityService) { }

  ngOnInit() {

    this.get52WeekLow();
  }

  get52WeekLow(): void {

    if (this.perChange52Week <= 0) {
      this.perChange52Week = 15;
    }
    let securityParam: SecurityResourceParameters = new SecurityResourceParameters();
    securityParam.perFrom52WeekLow = this.perChange52Week / 100;
    securityParam.minVolume = 3000000;
    this.securityService.getSecurities(securityParam).subscribe(weekLowSecurities => {
      this.weekLowSecurities = weekLowSecurities;

      
    });


    

  }



}
