import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Security } from '../interfaces/security';
import { HistoricalPrice } from '../interfaces/historicalprice';
import { SecurityResourceParameters } from '../interfaces/securityresourceparameters';
import { Earning } from '../interfaces/earning';
import { earningresourceparameters } from '../interfaces/earningresourceparameters';
import { DividendSecurity } from '../interfaces/dividendsecurity';
import { dividendresourceparameters } from '../interfaces/dividendresourceparameters';
import { Dividend } from '../interfaces/dividend';
import { EarningSecurity } from '../interfaces/earningsecurity';
import { EarningSecurityPercentage } from '../interfaces/earningsecuritypercentage';
import { AutoSecurityTradeSecurity } from '../interfaces/autosecuritytradesecurity';
import { autosecuritytradesresourceparameters } from '../interfaces/autosecuritytradesresourceparameters';
import { InvestProjection } from '../classes/InvestmentProjection/investprojection';
import { investmentprojectionsresourceparameters } from '../interfaces/resourceparameters/investmentprojectionsresourceparameters';
import { InvestProjectionStockFactory } from '../classes/InvestmentProjection/investprojectionstockfactory';
import { investmentprojectionforupdate } from '../interfaces/investmentprojectionforupdate';
import { investmentprojectionforadd } from '../interfaces/investmentprojectionforadd';

//import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class SecurityService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string//,
    //  private messageService: MessageService
  ) { }



  getHistoricalPrices(securityId: number, historyDaysBack: number): Observable<HistoricalPrice[]>{

    const currentDate = new Date();
    const priorDate = new Date();
    priorDate.setDate(priorDate.getDate() - historyDaysBack);
    var priorDateDetail = (priorDate.getMonth() + 1) + '/' + priorDate.getDate() + '/' + priorDate.getFullYear();
    var currentDateDetail = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();


    var searchQuery = 'HistoricDateLow=' + priorDateDetail + '&HistoricdateHigh=' + currentDateDetail;




    return this.http.get<HistoricalPrice[]>(this.baseUrl + 'security/' + securityId.toString() +'/HistoricalPrice?' + searchQuery)
      //  .pipe(
      //  tap(_ => this.log('fetched heroes')),
      // catchError(this.handleError<Security[]>('getHeroes', []))
      //  )
      ;
    //getHistoricalPrices
  }


  /** GET heroes from the server */
  getSecurities(securitySearch: SecurityResourceParameters): Observable<Security[]> {
    let searchQuery: string = '';

    searchQuery = this.SetSearchSecurityQuery(securitySearch);
    



    return this.http.get<Security[]>(this.baseUrl + 'security' + searchQuery)
      //  .pipe(
      //  tap(_ => this.log('fetched heroes')),
      // catchError(this.handleError<Security[]>('getHeroes', []))
      //  )
      ;
  }

  /** GET hero by id. Return `undefined` when id not found 
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  */
  /** GET hero by id. Will 404 if id not found */
  getSecurity(id: number): Observable<Security> {
    const url = `${this.baseUrl + 'security'}/${id}`;
    return this.http.get<Security>(url)
      //.pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      //catchError(this.handleError<Security>(`getHero id=${id}`))
      //)
      ;
  }

  /* GET heroes whose name contains search term 
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  */
  //////// Save methods //////////


  updateHistoricalPrices(val: string): Observable<any> {
    const params = null; new HttpParams().set('securityId', '' + val);

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: '' + val };
    return this.http.put<any>(this.baseUrl + 'security/' + val + '/historicalprice', body, { headers, params });
  }

      

  updateFutureEarnings(): Observable<any> {
    const params = null;
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { };
     return this.http.put<any>(this.baseUrl + 'security/futureearnings', body, { headers, params });
  }

  updateDividends(securityId: number): Observable<any> {

    const params = null;
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = {};
    return this.http.put<any>(this.baseUrl + 'security/' + securityId+'/dividend', body, { headers, params });
  }

  updateFutureDividends(): Observable<any> {
    const params = null;
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = {};
    return this.http.put<any>(this.baseUrl + 'security/futuredividends', body, { headers, params });
  }

  updateEarnings(val: string): Observable<any> {

    const params = null; //new HttpParams().set('securityId', '' + val);

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: val};
    return this.http.put<any>(this.baseUrl + 'security/' + val + '/earning', body, { headers, params });
  }


  getEarnings(val: string): Observable<Earning[]> {
    return this.http.get<Earning[]>(this.baseUrl + 'security/' + val + '/earning');
  }


  searchEarnings(earningSearch: earningresourceparameters): Observable<EarningSecurity[]> {

   let  searchQuery:string  = '';

    if (earningSearch.securityId) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "searchQuery=" + earningSearch.searchQuery;
    }


    if (earningSearch.actualEarningsDate) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "actualEarningsDate=" + earningSearch.actualEarningsDate;
    }


    if (earningSearch.rangeStartEarningsDate) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "rangeStartEarningsDate=" + earningSearch.rangeStartEarningsDate;
    }

    if (earningSearch.rangeEndEarningsDate) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "rangeEndEarningsDate=" + earningSearch.rangeEndEarningsDate;
    }


  


    return this.http.get<EarningSecurity[]>(this.baseUrl + 'security/SearchEarnings' + searchQuery);
  }



  earningsPercentage(securityId: number): Observable<EarningSecurityPercentage[]> {

    


    return this.http.get<EarningSecurityPercentage[]>(this.baseUrl + 'security/EarningsPercentage?securityId=' + securityId);
  }












  getDividends(securityId: number): Observable<Dividend[]>{


    return this.http.get<Dividend[]>(this.baseUrl + 'security/'+securityId +'/dividend');
  }

  searchDividends(dividendSearch: dividendresourceparameters): Observable<DividendSecurity[]> {

    let searchQuery: string = '';

    if (dividendSearch.securityId) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "searchQuery=" + dividendSearch.searchQuery;
    }


    if (dividendSearch.exDividendDate) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "exDividendDate=" + dividendSearch.exDividendDate;
    }


    if (dividendSearch.rangeExDividendDateStart) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "rangeExDividendDateStart=" + dividendSearch.rangeExDividendDateStart;
    }

    if (dividendSearch.rangeExDividendDateEnd) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "rangeExDividendDateEnd=" + dividendSearch.rangeExDividendDateEnd;
    }

    return this.http.get<DividendSecurity[]>(this.baseUrl + 'security/SearchDividends' + searchQuery);
  }

  

  updateAllSecurities(): Observable<any> {
    const params = null; 

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { };

    return this.http.put<any>(this.baseUrl + 'security/UpdateAllSecurities', body, { headers, params });


  }

   updateSecurities(val: string): Observable<any> {

    const params = new HttpParams().set('securityId', '' + val);

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId:  val };
    return  this.http.put<any>(this.baseUrl + 'security/' + val, body, { headers, params }).pipe(
      tap(_ => this.log(`updated hero id=${val}`)),
      catchError(this.handleError<any>('updateSecurity')));

        /*
        .subscribe(result => {


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


    }, error => console.error(error));
    */
  
  }

  searchAutoSecurityTrades(autosecuritytradesresourceparameter: autosecuritytradesresourceparameters): Observable<AutoSecurityTradeSecurity[]> {


    let searchQuery: string = '';
  
    if (autosecuritytradesresourceparameter.positionSold + '' == 'Sold') {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "positionSold=true";
    }
    if (autosecuritytradesresourceparameter.positionSold + '' == 'UnSold') {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "positionSold=false";
    }
     
    return this.http.get<AutoSecurityTradeSecurity[]>(this.baseUrl + 'security/SearchAutoSecurityTrades' + searchQuery);


  }
  //Observable<any>
  updateInvestmentProjection(investmentProjection: investmentprojectionforupdate): Observable<any> {

    /*
    const params = new HttpParams().set('investmentProjectionId', investmentProjection.id + '');
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = {
      id: investmentProjection.id,
      userId: investmentProjection.userId,
      projectionName: investmentProjection.projectionName,
      repeatInvestmentAmount: investmentProjection.repeatInvestmentAmount,
      repeatInvestmentFrequency: investmentProjection.repeatInvestmentFrequency,
      purchaseFrequency: investmentProjection.purchaseFrequency,
      yearRangeLow: investmentProjection.yearRangeLow,
      yearRangeHigh: investmentProjection.yearRangeHigh,
      securities: investmentProjection.securities 
    };
    //return
    console.log('matt was here');
    */
    const params = null;//new HttpParams().set('investmentProjectionId', investmentProjection.id + '');
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = {};



    


  return  this.http.put(this.baseUrl + 'investmentprojection/' + investmentProjection.id, investmentProjection, { headers, params })
      .pipe(
      tap(_ => this.log(`updated investmentProjection id=${investmentProjection.id}`)),
      catchError(this.handleError<any>('updateInvestmentProjection'))
    );
    
  }

/** PUT: update the hero on the server */
  updateSecurity(security: Security): Observable<any> {

    /*
    return this.http.put(this.heroesUrl, prefSecurity, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${prefSecurity.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
    */
    const params = new HttpParams().set('securityId', security.id + '');
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = {
      securityId: security.id,
      preferred: security.preferred,
      
    };
    return this.http.put(this.baseUrl + 'security/' + security.id, security, { headers, params }).pipe(
      tap(_ => this.log(`updated hero id=${security.id}`)),
      catchError(this.handleError<any>('updateSecurity'))
    );


    //  .subscribe(result => {

      //}, error => console.error(error));

    //}, error => console.error(error));


  }
    /*
    




    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: val };
    this.http.put<any>(this.baseUrl + 'security/' + val, body, { headers, params }).subscribe(result => {
      this.preferredsecurities = null;
      this.http.get<PreferredSecurities[]>(this.baseUrl + 'preferredsecurity').subscribe(result => {
        this.preferredsecurities = result;

      }, error => console.error(error));

    }, error => console.error(error));
    */

  
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
    console.log('matt was here');
  }






  /** GET heroes from the server */
  getInvestmentProjectionsSecurities(investmentProjectionSearch: investmentprojectionsresourceparameters): Observable<InvestProjectionStockFactory[]> {
    let searchQuery: string = '';

    //searchQuery = this.SetSearchSecurityQuery(securitySearch);

    
    if (investmentProjectionSearch.userId) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "userId=" + investmentProjectionSearch.userId;
    }


    return this.http.get<InvestProjectionStockFactory[]>(this.baseUrl + 'investmentprojection' + searchQuery)
      //  .pipe(
      //  tap(_ => this.log('fetched heroes')),
      // catchError(this.handleError<Security[]>('getHeroes', []))
      //  )
      ;
  }



  deleteInvestmentProjection(investmentProjectionId: number): Observable<any>{

    const params = new HttpParams().set('investmentProjectionId', investmentProjectionId + '');
    const body = { investmentProjectionId: investmentProjectionId };
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

    return this.http.delete(this.baseUrl + 'investmentprojection/' + investmentProjectionId, { headers,  params })
      .pipe(
        tap(_ => this.log(`added new investmentProjection`)),
        catchError(this.handleError<any>('addInvestmentProjection'))
      );


  }

  addInvestmentProjection(newInvestmentProjection: investmentprojectionforadd): Observable<any> {

   
    const params = null;//new HttpParams().set('investmentProjectionId', investmentProjection.id + '');
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = {};






    return this.http.post(this.baseUrl + 'investmentprojection', newInvestmentProjection, { headers, params })
      .pipe(
        tap(_ => this.log(`added new investmentProjection`)),
        catchError(this.handleError<any>('addInvestmentProjection'))
      );

  }









  SetSearchSecurityQuery(securitySearch: SecurityResourceParameters): string {
    let searchQuery: string = '';

    if (securitySearch.lastModifiedPrior) {
      searchQuery = searchQuery + (searchQuery == '' ? "?" : "&");
      searchQuery = searchQuery + "lastModifiedPrior=" + securitySearch.lastModifiedPrior;
    }


    if (securitySearch.preferred) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "preferred=" + securitySearch.preferred;
    }

    if (securitySearch.filtertype) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "filtertype=" + securitySearch.filtertype;
    }



    if (securitySearch.symbol) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "symbol=" + securitySearch.symbol;
    }


    if (securitySearch.searchQuery) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "searchQuery=" + securitySearch.searchQuery;
    }

    if (securitySearch.perChangeLow) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "perChangeLow=" + securitySearch.perChangeLow;
    }

    if (securitySearch.perChangeHigh) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "perChangeHigh=" + securitySearch.perChangeHigh;
    }

    if (securitySearch.perFrom52WeekLow) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "perFrom52WeekLow=" + securitySearch.perFrom52WeekLow;
    }
    if (securitySearch.perFrom52WeekHigh) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "perFrom52WeekHigh=" + securitySearch.perFrom52WeekHigh;
    }
    if (securitySearch.minVolume) {
      searchQuery = searchQuery + (searchQuery == "" ? "?" : "&");
      searchQuery = searchQuery + "minVolume=" + securitySearch.minVolume;
    }


    return searchQuery;
  }



}
