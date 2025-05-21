// Código de la página

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar

@Component({
  selector: 'app-login', // id para llamar a la página desde el html
  templateUrl: './login.page.html', // html que usa la página
  styleUrls: ['./login.page.scss'], // css que usa la página
  standalone: false
})

export class LoginPage implements OnInit {
  constructor(private router: Router) {} // Usamos dependencia router

  // Al cargar la página...
  ngOnInit() {}

  // Navegar a registro 
  navegarRegistro(){
    this.router.navigateByUrl('/registro')
  }
}
