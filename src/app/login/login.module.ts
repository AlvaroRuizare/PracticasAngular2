// Módulos que se necesitan en la página

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';
import { RegistroComponent } from '../registro/registro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage, 
    RegistroComponent // Se añade RegistroComponent para que herede los imports de login y pueda usar elementos de IonicModule
  ]
})
export class LoginPageModule {}
