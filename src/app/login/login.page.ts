// Código de la página

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Dependencia Router para navegar
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login', // id para llamar a la página desde el html
  templateUrl: './login.page.html', // html que usa la página
  styleUrls: ['./login.page.scss'], // css que usa la página
  standalone: false
})

export class LoginPage implements OnInit {
  grupoFormLogin!: FormGroup // Creamos grupo de formulario
  selectLenguaje : string = "es"

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toast: ToastController
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

    // Rellenamos grupo de formulario con los campos
    this.grupoFormLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
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


  // Iniciar sesión
  iniciarSesion(){
    // Validación de campos
    if (this.grupoFormLogin.invalid) { // Si algun campo del grupo es invalido...
      this.grupoFormLogin.markAllAsTouched(); // marcar grupo como tocado
      return; // salir
    }

    // Guardar valores del grupo en variables
    const { email, contrasena} = this.grupoFormLogin.value;
    

    // Crear array usuario introducido
    const arrayUsuarioIntroducido = {
      email: email,
      contrasena: this.cifrarContrasena(contrasena)
    };


    if(this.credencialesValidas(arrayUsuarioIntroducido.email, arrayUsuarioIntroducido.contrasena)){
      this.mostrarToast("Usuario logueado")
      alert("Usuario logueado")
    } else {
      this.mostrarToast("Las credenciales no son correctas.")
      alert("Las credenciales no son correctas.")
    }
  }


  // Comprobar si las credenciales introducidas existen en localStorage
  credencialesValidas(emailRecibido : string, contrasenaRecibida : string) : Boolean{
    var loginCorrecto = false

    // Array actual localStorage
    const jsonUsuariosLS = localStorage.getItem('usuarios'); // Obtener el array actual de usuarios del localStorage
    const arrayUsuariosLS = jsonUsuariosLS ? JSON.parse(jsonUsuariosLS) : []; // Si está vacío, devuelve array vacío
    
    // Rellenar array temporal emails
    var arrayEmails = []
    for (let i = 0; i < arrayUsuariosLS.length; i++) {
      arrayEmails.push(arrayUsuariosLS[i].email)
    }

    // Obtener índice del array en el que está el email recibido
    var i = arrayEmails.indexOf(emailRecibido)

    if(i != -1){ // Si el usuario recibido está en el array...
      // Si coinciden las credenciales...
      if(emailRecibido == arrayUsuariosLS[i].email &&
        contrasenaRecibida == arrayUsuariosLS[i].contrasena
      ) {
        loginCorrecto = true
      }
    }

    return loginCorrecto
  }


  // Mostrar toast
  async mostrarToast(mensaje : string){
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2500,
      color: 'danger',
      position: 'bottom'
    });
  
    await toast.present
  }


  // Cifrar contraseña
  cifrarContrasena(contrasenaCifrar : string) : string {
    return CryptoJS.SHA256(contrasenaCifrar).toString(CryptoJS.enc.Hex);
  }
}
