import { Component, Inject } from '@angular/core';


import { Security } from '../../interfaces/security';
import { SecurityResourceParameters } from '../../interfaces/securityresourceparameters';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { SecurityService } from '../../services/security.service';


@Component({
  selector: 'update-historical-price',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './update-historical-date.component.html',
  styleUrls: ['./update-historical-date.component.css']
})
export class UpdateHistoricalPriceComponent {
  public securities: Security[];

  public isCollapsed = false;
  public visible = false;
  public allHistorical = false;
  public securtiesUpdate: number;
  public securitiesUpdating: string[] = [];
  iconCollapse: string = 'icon-arrow-up';


 

  constructor(private securityService: SecurityService) {

  }


  ngOnInit() {
    // this.getSecurities();
  }



  retrieveHistoricalPrices(): void {
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    const d = new Date();

   
    var dateDetail = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
    // securitySearch.lastModifiedPrior = dateDetail;
    securitySearch.filtertype = "needHistoricalPriceUpdated";
    if (this.allHistorical) {
      alert('me')
      securitySearch.searchQuery = "all";
    }
    this.securityService.getSecurities(securitySearch)
      .subscribe(prefsecurities => {
        this.securities = prefsecurities;
        this.securtiesUpdate = this.securities.length;
        let securitySplit: number = Math.floor(this.securities.length / 4);
        let securityRemainder = this.securities.length % 4;
        let securityPoint = 0;


        this.updateHistoricalPricesSecurity(securityPoint, securityPoint + securitySplit, 1);
        securityPoint += securitySplit;
        this.updateHistoricalPricesSecurity(securityPoint, securityPoint + securitySplit, 2);
        securityPoint += securitySplit;
        this.updateHistoricalPricesSecurity(securityPoint, securityPoint + securitySplit, 3);
        securityPoint += securitySplit;
        this.updateHistoricalPricesSecurity(securityPoint, securityPoint + securitySplit + securityRemainder, 4);
      });
  }



  slideButton(): void {
    this.visible = !this.visible;
  }

  updateHistoricalPricesSecurity(index, stopIndex, strLoc): void {
    if (index < stopIndex) {

      this.securitiesUpdating.push(this.securities[index].symbol);

      this.updateHistoricalPriceSecurity(this.securities[index].id, index, stopIndex, strLoc);

    }


  }


  updateHistoricalPriceSecurity(val, index, stopIndex, strLoc) {
    this.securityService.updateHistoricalPrices(val).subscribe(result => {


      const updateindex = this.securitiesUpdating.indexOf(this.securities[index].symbol);
      if (updateindex > -1) {
        this.securitiesUpdating.splice(updateindex, 1);
      }



      index += 1;
      this.securtiesUpdate -= 1;
      if (this.securtiesUpdate < 0) {
        this.securtiesUpdate = 0;
      }
      this.updateHistoricalPricesSecurity(index, stopIndex, strLoc);


    }, error => {
      console.error(error)
        const updateindex = this.securitiesUpdating.indexOf(this.securities[index].symbol);
        if (updateindex > -1) {
          this.securitiesUpdating.splice(updateindex, 1);
        }



        index += 1;
        this.securtiesUpdate -= 1;
        if (this.securtiesUpdate < 0) {
          this.securtiesUpdate = 0;
        }
        this.updateHistoricalPricesSecurity(index, stopIndex, strLoc);






    });




  }




}



