import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Security } from '../../interfaces/security';
import { SecurityResourceParameters } from '../../interfaces/securityresourceparameters';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { SecurityService } from '../../services/security.service';


@Component({
  selector: 'update-security',
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
  templateUrl: './update-security.component.html',
  styleUrls: ['./update-security.component.css']
})
export class UpdateSecurityComponent {
  public securities: Security[];
  btnUpdateSecurityOn: boolean = false;
  public isCollapsed = false;
  public visible = false;
  isOpen = false;
  public securtiesUpdate: number;
  public securitiesUpdating: string[] = [];
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private securityService: SecurityService) {
    /*
    http.get<PreferredSecurities[]>(baseUrl + 'preferredsecurity').subscribe(result => {
      this.preferredsecurities = result;

    }, error => console.error(error));
    */
  }


  ngOnInit() {
   // this.getSecurities();
  }



  retrieveSecurities(securityParam): void {
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    const d = new Date();
    
    if (securityParam == 'hoursPrior12') {
      d.setDate(d.getDate() - .5);

    }
    var dateDetail = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
    securitySearch.lastModifiedPrior = dateDetail;
   // securitySearch.preferred = true;
    this.securityService.getSecurities(securitySearch)
      .subscribe(prefsecurities => {
        this.securities = prefsecurities;
        /*
        this.securtiesUpdate = this.securities.length;
        let securitySplit: number = Math.floor(this.securities.length / 4);
        let securityRemainder = this.securities.length % 4;
        let securityPoint = 0;


        this.updateSecurities(securityPoint, securityPoint + securitySplit, 1);
        securityPoint += securitySplit;
        this.updateSecurities(securityPoint, securityPoint + securitySplit, 2);
        securityPoint += securitySplit;
        this.updateSecurities(securityPoint, securityPoint + securitySplit, 3);
        securityPoint += securitySplit;
        this.updateSecurities(securityPoint, securityPoint + securitySplit + securityRemainder, 4);
        */
      });
  }

  updateAllSecurities(): void {
    this.btnUpdateSecurityOn = true;
    this.securityService.updateAllSecurities()
      .subscribe(prefsecurities => {
        this.btnUpdateSecurityOn = false;   
      });
  }

  updateSecurities(index, stopIndex, strLoc): void {
    if (index < stopIndex) {

      this.securitiesUpdating.push(this.securities[index].symbol);

      this.updateSecurity(this.securities[index].id, index, stopIndex, strLoc);

    }


  }


  updateSecurity(val, index, stopIndex, strLoc) {
    const params = new HttpParams().set('securityId', '' + val);

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: '' + val };

  //  let securityAwait = await this.securityService.updateSecurities(val);

    this.http.put<any>(this.baseUrl + 'security/' + val, body, { headers, params }).subscribe(result => {


      const updateindex = this.securitiesUpdating.indexOf(this.securities[index].symbol);
      if (updateindex > -1) {
        this.securitiesUpdating.splice(updateindex, 1);
      }



      index += 1;
      this.securtiesUpdate -= 1;
      if (this.securtiesUpdate < 0) {
        this.securtiesUpdate = 0;
      }
      this.updateSecurities(index, stopIndex, strLoc);


    }, error => {
        console.error(error);
        const updateindex = this.securitiesUpdating.indexOf(this.securities[index].symbol);
        if (updateindex > -1) {
          this.securitiesUpdating.splice(updateindex, 1);
        }



        index += 1;
        this.securtiesUpdate -= 1;
        if (this.securtiesUpdate < 0) {
          this.securtiesUpdate = 0;
        }
        this.updateSecurities(index, stopIndex, strLoc);

    }



    );




  }




}
export class ExpansionOverviewExample {
  panelOpenState = false;
}



/*
getSecurities(): void {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  var dateDetail = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
  let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
  //securitySearch.lastModifiedPrior = dateDetail;
  securitySearch.preferred = true;
  this.securityService.getSecurities(securitySearch)
    .subscribe(prefsecurities => {
      this.securities = prefsecurities;
      this.securtiesUpdate = this.securities.length;
      let securitySplit: number = Math.floor(this.securities.length / 4);
      let securityRemainder = this.securities.length % 4;
      let securityPoint = 0;


      this.updateSecurities(securityPoint, securityPoint + securitySplit, 1);
      securityPoint += securitySplit;
      this.updateSecurities(securityPoint, securityPoint + securitySplit, 2);
      securityPoint += securitySplit;
      this.updateSecurities(securityPoint, securityPoint + securitySplit, 3);
      securityPoint += securitySplit;
      this.updateSecurities(securityPoint, securityPoint + securitySplit + securityRemainder, 4);
    });

}
*/
