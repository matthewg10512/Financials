import { Component, OnInit, Input } from '@angular/core';
import { InvestProjectionStock } from '../../../classes/InvestmentProjection/investprojectionstock';

@Component({
  selector: 'app-security-projection',
  templateUrl: './security-projection.component.html',
  styleUrls: ['./security-projection.component.css']
})
export class SecurityProjectionComponent implements OnInit {
  @Input() investProjectionStock: InvestProjectionStock;


  constructor() { }

  ngOnInit() {
  }

}
