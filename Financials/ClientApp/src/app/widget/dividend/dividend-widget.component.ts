import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { ActivatedRoute } from '@angular/router';
import { Dividend } from '../../interfaces/dividend';

@Component({
  selector: 'app-dividend-widget',
  templateUrl: './dividend-widget.component.html',
  styleUrls: ['./dividend-widget.component.css']
})
export class DividendWidgetComponent implements OnInit {
  dividends: Dividend[];
  constructor(private securityService: SecurityService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDividends();
  }


  getDividends(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.securityService.getDividends(id).subscribe(dividends => {
      this.dividends = dividends

    });
  }

  updateDividends(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.securityService.updateDividends(id).subscribe(earnings => {
      this.getDividends();

    });
  }



}
