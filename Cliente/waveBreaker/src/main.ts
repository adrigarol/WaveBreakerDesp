import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/interceptors/auth.interceptor';

import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';
import { APP_ROUTES } from './app/routes';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


bootstrapApplication(AppComponent,{
  providers:[
    importProvidersFrom(SweetAlert2Module.forRoot()),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(APP_ROUTES),
  ],
}).catch((e) => console.log(e));
