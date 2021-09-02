import { BaseComponent } from './base/base.component';
import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  title = 'carOwner';
  constructor(injector: Injector) {
    super(injector);
  }
}
