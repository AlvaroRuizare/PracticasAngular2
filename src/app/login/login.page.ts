// Código de la página

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login', // id para llamar a la página desde el html
  templateUrl: './login.page.html', // html que usa la página
  styleUrls: ['./login.page.scss'], // css que usa la página
  standalone: false
})

export class LoginPage implements OnInit {

  selectLenguaje : string = "es"

  constructor(
    private router: Router, 
    private translate: TranslateService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  
  // Al cargar la página...
  ngOnInit() {
    // Obtener lenguaje
    var lenguajeLS = localStorage.getItem('lenguaje'); // intentar obtener lenguaje de localStorage
    this.selectLenguaje = lenguajeLS == null ? "es" : lenguajeLS; // Si el lenguaje del localStorage está vacío, por defecto se aplica "es". Si no, el valor del localStorage
    
    // Cambiar lenguaje login
    this.translate.use(this.selectLenguaje)
  }


  // Navegar a registro 
  navegarRegistro(){
    this.router.navigateByUrl('/registro')
  }

  
  // Cambiar lenguaje
  cambiarLenguaje(event: Event) {
    // Cambiar lenguaje login
    const valorSelect = (event.target as HTMLSelectElement).value;
    this.translate.use(valorSelect)

    // Guardar en localStorage
    localStorage.setItem('lenguaje', valorSelect);
  }
}
