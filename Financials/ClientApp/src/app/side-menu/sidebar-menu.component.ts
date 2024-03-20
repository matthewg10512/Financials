import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecurityService } from '../services/security.service';
import { Security } from '../interfaces/security';
import { SecurityResourceParameters } from '../interfaces/securityresourceparameters';
import { trigger, transition, animate, style, state } from '@angular/animations'


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})


export class SideBarMenuComponent {

 
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





}

