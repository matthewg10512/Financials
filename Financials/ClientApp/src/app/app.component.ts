import { Component } from '@angular/core';
import { Sidebar, Alert, Popover } from '@coreui/coreui';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('20000ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('20000ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]



})
export class AppComponent {
  //title = 'app';
  errorMessage: string;
  isHidden: boolean = true;


  toggleView(): void {
    this.isHidden = !(this.isHidden);
  }

}
