// app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Provide routes
    importProvidersFrom(BrowserModule, HttpClientModule), // Import HttpClientModule
    provideClientHydration() // Provide client hydration
  ],
};
