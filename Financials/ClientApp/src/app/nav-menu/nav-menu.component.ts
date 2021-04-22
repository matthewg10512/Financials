import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecurityService } from '../services/security.service';
import { Security } from '../interfaces/security';
import { SecurityResourceParameters } from '../interfaces/securityresourceparameters';
import { trigger, transition, animate, style, state} from '@angular/animations'


@Component({
  selector: 'app-nav-menu',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
  })
export class NavMenuComponent {
  public securities: Security[];
  public strProcessing1: string;
  public strProcessing2: string;
  public strProcessing3: string;
  public strProcessing4: string;
  public isCollapsed = false;
  public visible = false;
  isOpen = true;

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
    //this.getSecurities();
  }

  getSecurities(): void {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    var dateDetail =(d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
    let securitySearch: SecurityResourceParameters = new SecurityResourceParameters();
    securitySearch.lastModifiedPrior = dateDetail;
    this.securityService.getSecurities(securitySearch)
      .subscribe(prefsecurities => {
      this.securities = prefsecurities;

        let securitySplit: number = Math.floor(this.securities.length / 4);
        let securityRemainder = this.securities.length % 4;
        let securityPoint = 0;
        

        this.updateSecurities(securityPoint, securityPoint + securitySplit, 1);
        securityPoint += securitySplit;
        this.updateSecurities(securityPoint, securityPoint + securitySplit,2);
        securityPoint += securitySplit;
        this.updateSecurities(securityPoint, securityPoint + securitySplit, 3);
        securityPoint += securitySplit;
        this.updateSecurities(securityPoint, securityPoint + securitySplit + securityRemainder, 4);
      });

  }

  slideButton(): void {
    this.visible = !this.visible;
  }

  updateSecurities(index, stopIndex,strLoc): void {
    if (index < stopIndex) {
      switch (strLoc) {
        case 1:
          this.strProcessing1 =  this.securities[index].symbol + ' ' + index + '/' + this.securities.length
          break;
        case 2:
          this.strProcessing2 = this.securities[index].symbol + ' ' + index + '/' + this.securities.length
          break;
        case 3:
          this.strProcessing3 = this.securities[index].symbol + ' ' + index + '/' + this.securities.length
          break;
        case 4:
          this.strProcessing4 = this.securities[index].symbol + ' ' + index + '/' + this.securities.length
          break;
      }
      
      this.updateSecurity(this.securities[index].id, index, stopIndex, strLoc);

    }


  }





  updateSecurity(val, index, stopIndex, strLoc) {


    const params = new HttpParams().set('securityId', '' + val);




    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const body = { securityId: '' + val };
    this.http.put<any>(this.baseUrl + 'security/' + val, body, { headers, params }).subscribe(result => {
      index += 1;
      this.updateSecurities(index, stopIndex, strLoc);


    }, error => console.error(error));




  }




}
export class ExpansionOverviewExample {
  panelOpenState = false;
}
