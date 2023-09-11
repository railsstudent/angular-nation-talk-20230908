import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [{
  path: 'rxjs-control-panel',
  loadComponent: () => import('./rxjs-control-panel/rxjs-control-panel.component')
    .then(mod => mod.RxjsControlPanelComponent)
}, 
{
  path: 'signal-control-panel',
  pathMatch: 'full',
  loadComponent: () => import('./signal-control-panel/signal-control-panel.component').then(mod => mod.SignalControlPanelComponent)
},
{
    path: 'combine-latest-counter',
    pathMatch: 'full',
    loadComponent: () => import('./combine-latest-counter/combine-latest-counter.component').then(mod => mod.CombineLatestCounterComponent)
},
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'rxjs-control-panel'
},
{
  path: '**',
  redirectTo: 'rxjs-control-panel'
}];