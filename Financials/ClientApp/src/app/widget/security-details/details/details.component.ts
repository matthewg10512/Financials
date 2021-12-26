import { Component, OnInit, Input } from '@angular/core';
import { Security } from '../../../interfaces/security';
import { SecurityPurchaseCheck } from '../../../interfaces/SecurityPurchaseCheck';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() security: Security;
  @Input() secPurCheck: SecurityPurchaseCheck;
  constructor() { }

  ngOnInit() {
  }

  setPreferred(): void {


    this.security.preferred = !(this.security.preferred);
  }
}
