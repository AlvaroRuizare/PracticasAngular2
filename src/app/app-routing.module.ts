// Navegación de la aplicación

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  {
    path: 'login', // Cuando se inicia la página...
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), // Se muestra el módulo de la página
    component: LoginPage 
  },
  { 
    path: 'registro', // Ruta registro
    component: RegistroComponent 
  }, 
  { 
    path: '', // Cuando la dirección está vacía...
    redirectTo: 'login', // se redirecciona a otra página
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
