import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { dividendresourceparameters } from '../interfaces/dividendresourceparameters';
import { DividendSecurity } from '../interfaces/dividendsecurity';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.css']
})
export class DividendComponent implements OnInit {
  dividendSecurities: DividendSecurity[];
  constructor(

    private securityService: SecurityService,
  ) { }

  ngOnInit() {
    this.GetFutureDividends(true);
    

  }


  updateFutureDividends(): void {


    this.securityService.updateFutureDividends().subscribe(result => {

      if (!this.dividendSecurities == null
        || this.dividendSecurities.length == 0
      ) {
        this.GetFutureDividends(false);

      }
    }, error => {

    })
  }

  GetFutureDividends(updateDividends: boolean): void {



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


      

    this.dividendSecurities.sort((a, b) => new Date(a.exDividendDate).getTime() - new Date(b.exDividendDate).getTime() );

      if (updateDividends) {
        this.updateFutureDividends();
      }
    }, error => {

    })

    
  }
}
