import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CombineLatestCounterComponent } from './combine-latest-counter/combine-latest-counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CombineLatestCounterComponent],
  template: `
    <app-combine-latest-counter></app-combine-latest-counter>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Angular Nation Talk')
  }
}
