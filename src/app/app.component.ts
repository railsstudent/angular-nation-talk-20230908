import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div>
      <ul>
        <li><a routerLink="/rxjs-control-panel" routerLinkActive="active">RxJS Control Panel</a></li>
        <li><a routerLink="/signal-control-panel" routerLinkActive="active">Signal Control Panel</a></li>
        <li><a routerLink="/combine-latest-counter" routerLinkActive="active">CombineLatest Counter</a></li>
      </ul>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    div {
      padding: 0.25rem;
    }

    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      li {
        list-style-type: none;
      }
    }
  `],
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Angular Nation Talk')
  }
}
