import { GestureController, IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { TranslateService, TranslatePipe, TranslateDirective, TranslateModule } from "@ngx-translate/core";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    NgxMaskDirective, 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
    TranslateModule
  ]
})

export class RegistroComponent  implements OnInit {
  grupoFormRegistro!: FormGroup // Creamos grupo de formulario
  latitud : number | undefined
  longitud : number | undefined


  constructor(private router: Router, private formBuilder: FormBuilder, private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  
  // Al iniciar página...
  ngOnInit() {
    this.obtenerUbicacion();

    // Rellenamos grupo de formulario con los campos
    this.grupoFormRegistro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      fechaNac: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });

    this.traducirPagina();
  }


  // Navegar a login
  navegarLogin(){
    this.router.navigateByUrl('/login')
  }


  // Obtener ubicacion
  async obtenerUbicacion() {
    const posicion = await Geolocation.getCurrentPosition();

    // Actualizar variables localizacion
    this.latitud = posicion.coords.latitude
    this.longitud = posicion.coords.longitude
  }


  // Crear cuenta
  crearCuenta(){
    // Validación de campos
    if (this.grupoFormRegistro.invalid) { // Si algun campo del grupo es invalido...
      this.grupoFormRegistro.markAllAsTouched(); // marcar grupo como tocado
      return; // salir
    }

    // Guardar valores del grupo en variables
    const { email, contrasena, fechaNac, telefono } = this.grupoFormRegistro.value;

    // Array actual localStorage
    const jsonUsuariosLS = localStorage.getItem('usuarios'); // Obtener el array actual de usuarios del localStorage
    const arrayUsuariosLS = jsonUsuariosLS ? JSON.parse(jsonUsuariosLS) : []; // Si está vacío, devuelve array vacío

    // Crear array nuevo usuario
    const arrayUsuarioNuevo = {
      email: email,
      contrasena: this.cifrarContrasena(contrasena),
      fechaNac: fechaNac,
      telefono: telefono,
      latitud : this.latitud,
      longitud : this.longitud
    };

    // Agregar nuevo usuario al array
    arrayUsuariosLS.push(arrayUsuarioNuevo);

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(arrayUsuariosLS));
    alert("El usuario " + email + " se ha registrado correctamente.");

    // Resetear campos
    this.grupoFormRegistro.reset();
  }


  // Traducir al lenguaje que se haya elegido en el login
  traducirPagina(){
    // Obtener lenguaje
    var lenguajeLS = localStorage.getItem('lenguaje'); // intentar obtener lenguaje de localStorage
    var lenguajeTraducir = lenguajeLS == null ? "es" : lenguajeLS; // Si el lenguaje del localStorage está vacío, por defecto se aplica "es". Si no, el valor del localStorage
    
    // Cambiar lenguaje login
    this.translate.use(lenguajeTraducir)
  }


  // Cifrar contraseña
  cifrarContrasena(contrasenaCifrar : string) : String {
    return CryptoJS.SHA256(contrasenaCifrar).toString(CryptoJS.enc.Hex);
  }
}
