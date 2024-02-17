import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { test } from './interceptors/unsplash.interceptor';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AppReducer } from './store/app.reducer';
import { AppEffectsArray } from './store/app.efects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([test])),
    provideStore(AppReducer),
    provideEffects(AppEffectsArray),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
