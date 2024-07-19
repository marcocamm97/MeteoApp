import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";
import {UserService} from "./services/user.service";
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {MyStorageService} from "./services/my-storage.service";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    UserService, provideHttpClient(), MyStorageService]
};
