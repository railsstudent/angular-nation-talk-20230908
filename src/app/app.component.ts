import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CombineLatestCounterComponent } from './combine-latest-counter/combine-latest-counter.component';
import { RxjsControlPanelComponent } from './rxjs-control-panel/rxjs-control-panel.component';
import { SignalControlPanelComponent } from './signal-control-panel/signal-control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CombineLatestCounterComponent, RxjsControlPanelComponent, SignalControlPanelComponent],
  template: `
    <div>
      <app-rxjs-control-panel></app-rxjs-control-panel>
      <app-signal-control-panel></app-signal-control-panel>
      <app-combine-latest-counter></app-combine-latest-counter>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    div {
      padding: 0.25rem;
    }
  `],
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Angular Nation Talk')
  }
}
