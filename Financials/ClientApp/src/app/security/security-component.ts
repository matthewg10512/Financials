import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-security-component',
  templateUrl: './security.component.html'
})
export class SecurityComponent {
  
  public stockId: string = '251';
  public https: HttpClient;
  public searchQuery: string;


//  const headers = new HttpHeaders().append('header', 'value');
//this.http.get('url', { headers, params }); 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    /*
  const params = new HttpParams().append('stockId', this.stockId);
  const headers = new HttpHeaders().append('header', 'value');
  http.get<Security[]>(baseUrl + 'security', { headers, params}).subscribe(result => {
      this.securities = result;

    }, error => console.error(error));
    */
  }



  



  

}
