import { Component, Inject, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Security } from '../../interfaces/security';
import { SecurityResourceParameters } from '../../interfaces/securityresourceparameters';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { SecurityService } from '../../services/security.service';
import { DividendSecurity } from '../../interfaces/dividendsecurity';
import { dividendresourceparameters } from '../../interfaces/dividendresourceparameters';
import { earningresourceparameters } from '../../interfaces/earningresourceparameters';
import { EarningSecurity } from '../../interfaces/earningsecurity';
import { Router } from '@angular/router';


@Component({
  selector: 'security-search',
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
  templateUrl: './search-security.component.html',
  styleUrls: ['./search-security.component.css']
})
export class SearchSecurityComponent {
  @Input() actionItem = '';
  @Output() securitySelectEvent = new EventEmitter<Security>();

  earnings: EarningSecurity[];
  dividendSecurities: DividendSecurity[];
  public securities: Security[];
  public searchQuery: string;
  public onlyPreferred: boolean = false;
  buttons: boolean[]
  sortNameDesc = false;
  sortPercentageDesc = false;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private securityService: SecurityService
    , private router: Router//, private route: ActivatedRoute

  ) {
    /*
    http.get<PreferredSecurities[]>(baseUrl + 'preferredsecurity').subscribe(result => {
      this.preferredsecurities = result;

    }, error => console.error(error));
    */
  }


  ngOnInit() {
    this.getEarnings();
    this.GetFutureDividends();
    this.getSecurities();
  }


  navigatePage(security: Security) {
    //routerLink = "/detail/"
    if (this.actionItem =='populatesecurityid') {
      this.securitySelectEvent.emit(security);
    }
    else {
      this.router.navigate(['/detail/' + security.id]);
    }
    
  }


  updatePreferred(security: Security, j: number): void {
    let securityLocal = security;
    securityLocal.preferred = !securityLocal.preferred;

    this.securityService.updateSecurity(securityLocal)
      .subscribe(() => this.buttons[j] = false);
    

  }

  sortByPercentage(): void {
    if (!this.sortPercentageDesc) {
      this.securities.sort((a, b) => a.percentageChange -  b.percentageChange);
    }
    else {
      this.securities.sort((a, b) => b.percentageChange - a.percentageChange);
    }
    this.sortPercentageDesc = !this.sortPercentageDesc;
  }


  sortByName(): void {
    if (!this.sortNameDesc) {
      this.securities.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      this.securities.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.sortNameDesc = !this.sortNameDesc;
  }

  getSecurities(): void {
    
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    securitySearch.preferred = true;
    this.securityService.getSecurities(securitySearch)
      .subscribe(prefsecurities => {
      this.securities = prefsecurities
        this.buttons = Array(this.securities.length).fill(false);
        this.DividendCheck();
        this.EarningsCheck();
      });
  }


  searchStock() {

    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    if (this.onlyPreferred) {
      securitySearch.preferred = true;
    }

    securitySearch.searchQuery = this.searchQuery;
    this.securityService.getSecurities(securitySearch).subscribe(result => {
      this.securities = result;
      this.DividendCheck();
      this.EarningsCheck();
    }, error => console.error(error));
    /*
    this.securities = null;
    const params = new HttpParams().append('searchQuery', this.searchQuery);
    const headers = new HttpHeaders().append('header', 'value');
    this.http.get<Security[]>(this.baseUrl + 'security', { headers, params })
    .subscribe(result => {
      this.securities = result;

    }, error => console.error(error));
    */
  }


  getEarnings(): void {
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
      this.EarningsCheck();
    }, error => {

    })
  }



  EarningsCheck(): void {
    if (this.earnings == null || this.securities == null) {
      return;
    }
    let earningsLength = this.earnings.length;

    let securitySearchLength = this.securities.length;

    for (var i = 0; i < earningsLength; i++) {

      for (var i2 = 0; i2 < securitySearchLength; i2++) {

        if (this.earnings[i].securityId !=null && this.earnings[i].securityId == this.securities[i2].id) {
          this.securities[i2].earning = this.earnings[i].actualEarningsDate;
        }


      }
      

    }
  }

  DividendCheck(): void {

    if (this.dividendSecurities == null || this.securities == null) {
      return;
    }
    let dividendLength = this.dividendSecurities.length;

    let securitySearchLength = this.securities.length;

    for (var i = 0; i < dividendLength; i++) {

      for (var i2 = 0; i2 < securitySearchLength; i2++) {

        if (this.dividendSecurities[i].securityId != null && this.dividendSecurities[i].securityId == this.securities[i2].id) {
          this.securities[i2].dividend = this.dividendSecurities[i].exDividendDate;
          this.securities[i2].dividendamount = this.dividendSecurities[i].amount;
        }
        

      }
      

    }


  }

  GetFutureDividends(): void {

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    var currentdateDetail = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    var futuredateDetail = (futureDate.getMonth() + 1) + '/' + futureDate.getDate() + '/' + futureDate.getFullYear();

    let dividendParams: dividendresourceparameters = new dividendresourceparameters();
    dividendParams.rangeExDividendDateStart = currentdateDetail;
    dividendParams.rangeExDividendDateEnd = futuredateDetail;

    this.securityService.searchDividends(dividendParams).subscribe(result => {
      this.dividendSecurities = result;

      this.dividendSecurities.sort((a, b) => a.securityId - b.securityId);

      this.DividendCheck();
    }, error => {

    })


  }


}



