import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Security } from '../interfaces/security';
import { SecurityService } from '../services/security.service';
import { SecurityResourceParameters } from '../interfaces/securityresourceparameters';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Earning } from '../interfaces/earning';
//ng g c dividend --module app


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [NgbPopoverConfig] // add NgbPopoverConfig to the component providers
})
export class HomeComponent {

 // public preferredsecurities: PreferredSecurities[];
  public securities: Security[];
  public earnings: Earning[];

  //  const headers = new HttpHeaders().append('header', 'value');
  //this.http.get('url', { headers, params }); 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private securityService: SecurityService, config: NgbPopoverConfig) {

    config.placement = 'bottom';
    config.triggers = 'hover';
    /*
    http.get<PreferredSecurities[]>(baseUrl + 'preferredsecurity').subscribe(result => {
      this.preferredsecurities = result;

    }, error => console.error(error));
    */
  }


  ngOnInit() {
    
  //  this.getSecurities();
  }


  
  getSecurities(): void {
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    securitySearch.preferred = true;
    this.securityService.getSecurities(securitySearch)
      .subscribe(prefsecurities => this.securities = prefsecurities);
  } 

  viewProfile(val) {


    const params = new HttpParams().set('securityId', val);
    
    


    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: val };
    this.http.put<any>(this.baseUrl + 'security/' + val, body, {headers, params}).subscribe(result => {
      this.securities = null;
      this.http.get<Security[]>(this.baseUrl + 'preferredsecurity').subscribe(result => {
        this.securities = result;

      }, error => console.error(error));

    }, error => console.error(error));


    

  }




}


