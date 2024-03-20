import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { ActivatedRoute } from '@angular/router';
import { Earning } from '../../interfaces/earnings/earning';
import { EarningSecurityPercentage } from '../../interfaces/earnings/earningsecuritypercentage';

   

@Component({
  selector: 'app-earning-widget',
  templateUrl: './earning-widget.component.html',
  styleUrls: ['./earning-widget.component.css']
})
export class EarningWidgetComponent implements OnInit {
  public earnings: Earning[];
  public percentageChanges: EarningSecurityPercentage[];
  public earningsPerTotalChange: number;
  constructor(private securityService: SecurityService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEarnings();
    this.getPercentageChangers();
  }

  updateEarnings(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.securityService.updateEarnings(id.toString())
      .subscribe(earnings => {
        this.getEarnings();

      });

  }

  getPercentageChangers(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.securityService.earningsPercentage(id)
      .subscribe(getPercentageChangers => {
        this.percentageChanges = getPercentageChangers
        this.percentageChanges.sort((a, b) => new Date(b.actualEarningsDate).getTime() - new Date(a.actualEarningsDate).getTime());
        console.log(this.percentageChanges.length);
        if (this.percentageChanges.length > 0) {
          this.earningsPerTotalChange = 0;
          for (var i=0; i < this.percentageChanges.length; i++) {
            console.log(this.percentageChanges[i].percentageChange);
            this.earningsPerTotalChange += this.percentageChanges[i].percentageChange;
          }

        }
        


      });

  }
  getEarnings(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.securityService.getEarnings(id.toString())
      .subscribe(earnings => {
        this.earnings = earnings;
        this.earnings.sort((a, b) => new Date(b.actualEarningsDate).getTime() - new Date(a.actualEarningsDate).getTime());

      });

  }

}
