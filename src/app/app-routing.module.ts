// Navegación de la aplicación

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', // Cuando la dirección está vacía...
    redirectTo: 'login', // se redirecciona a otra página
    pathMatch: 'full'
  },
  {
    path: 'login', // Cuando se inicia la página...
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), // Se muestra el módulo de la página
  },
  { 
    path: 'registro', // Ruta registro
    loadComponent: () =>
      import('./registro/registro.component').then(m => m.RegistroComponent)
  },  {
    path: 'listado',
    loadChildren: () => import('./listado/listado.module').then( m => m.ListadoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
