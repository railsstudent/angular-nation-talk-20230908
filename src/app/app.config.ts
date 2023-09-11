import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app.route';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))]
};
