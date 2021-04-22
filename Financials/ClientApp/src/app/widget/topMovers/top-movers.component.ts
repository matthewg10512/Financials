import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Security } from '../../interfaces/security';
import { SecurityResourceParameters } from '../../interfaces/securityresourceparameters';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { SecurityService } from '../../services/security.service';


@Component({
  selector: 'top-movers',
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
  templateUrl: './top-movers.component.html',
  styleUrls: ['./top-movers.component.css']
})
export class TopMoversComponent {
  public isCollapsed = false;
  public visible = false;
  isOpen = false;
  public securtiesUpdate: number;
  public securitiesUpdating: string[] = [];
  public TopMovers: Security[];
  public negValBelow5 = false;
  public topMoversSearch: topMoversSearch = new topMoversSearch();
  public rangeLow: number = -5;
  public rangeHigh: number = 5;



  toggle() {
    this.isOpen = !this.isOpen;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private securityService: SecurityService) {
    /*
    http.get<PreferredSecurities[]>(baseUrl + 'preferredsecurity').subscribe(result => {
      this.preferredsecurities = result;

    }, error => console.error(error));
    */
  }


  ngOnInit() {
    this.topMoversSearch.negValBelow5 = false;
    this.getTopMovers();
  }


  

  getTopMovers(): void {

   this.TopMovers = null;
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
   // securitySearch.filtertype = "todaysGainers";
    securitySearch.perChangeLow = this.rangeLow;
    securitySearch.perChangeHigh = this.rangeHigh;

    this.securityService.getSecurities(securitySearch)
      .subscribe(topMovers => {
        this.TopMovers = topMovers;
        this.TopMovers.sort((a, b) => a.percentageChange - b.percentageChange);
      });

  }
  





  




}
export class ExpansionOverviewExample {
  panelOpenState = false;
}
export class topMoversSearch {
  negValBelow5: boolean;



}
