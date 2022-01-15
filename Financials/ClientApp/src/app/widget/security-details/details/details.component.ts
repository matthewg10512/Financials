import { Component, OnInit, Input } from '@angular/core';
import { Security } from '../../../interfaces/security';
import { PriorPurchaseEstimate } from '../../../interfaces/PriorPurchaseEstimate';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() security: Security;
  @Input() priorPurEst: PriorPurchaseEstimate;
  constructor() { }

  ngOnInit() {
  }

  setPreferred(): void {


    this.security.preferred = !(this.security.preferred);
  }
}
