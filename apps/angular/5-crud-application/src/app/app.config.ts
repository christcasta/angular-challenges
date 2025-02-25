import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { AppService } from './app.service';

export const appConfig: ApplicationConfig = {
    providers: [provideHttpClient(), AppService],
};
