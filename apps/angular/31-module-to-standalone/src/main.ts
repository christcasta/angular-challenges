import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Routes = [{ path: '**', redirectTo: '' }];

bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
