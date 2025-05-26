// Módulos que se necesitan en la página

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { RegistroComponent } from '../registro/registro.component';
import { TranslateService, TranslatePipe, TranslateDirective } from "@ngx-translate/core";


@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    RegistroComponent,
    TranslatePipe, 
    TranslateDirective
  ]
})
export class LoginPageModule {
  constructor(private translate: TranslateService) {
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
      this.translate.use('es');
    }
}
