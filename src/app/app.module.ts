import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from "@angular/forms";

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NgxMaskDirective, 
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideNgxMask(), 
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
