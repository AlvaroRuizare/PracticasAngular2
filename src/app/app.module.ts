import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgxMaskDirective],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
