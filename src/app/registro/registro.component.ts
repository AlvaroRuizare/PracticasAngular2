import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonicModule, NgxMaskDirective, FormsModule, ReactiveFormsModule, CommonModule]
})

export class RegistroComponent  implements OnInit {
  grupoFormRegistro!: FormGroup // Creamos grupo de formulario

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Rellenamos grupo de formulario con los campos
    this.grupoFormRegistro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      fechaNac: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  // Navegar a login
  navegarLogin(){
    this.router.navigateByUrl('/login')
  }

  // Crear cuenta
  crearCuenta(){

    // Validación de campos
    if (this.grupoFormRegistro.invalid) { // Si algun campo del grupo es invalido...

      const valores = this.grupoFormRegistro.value;
      console.log(valores.email); // ver valores
      console.log(valores.contrasena); // ver valores
      console.log(valores.fechaNac); // ver valores
      console.log(valores.telefono); // ver valores

      this.grupoFormRegistro.markAllAsTouched(); // marcar grupo como tocado
      return; // salir
    }
    
    // Guardar valores del grupo en variables
    const { email, contrasena, fechaNac, telefono } = this.grupoFormRegistro.value;

    // Array actual localStorage
    const usuariosJSON = localStorage.getItem('usuarios'); // Obtener el array actual de usuarios del localStorage
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : []; // Si está vacío, devuelve array vacío

    // Crear array nuevo usuario
    const nuevoUsuario = {
      nombre: email,
      email: contrasena,
      password: fechaNac,
      telefono: telefono
    };

    // Agregar nuevo usuario al array
    usuarios.push(nuevoUsuario);

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert(email + " registrado correctamente.");

    // Resetear campos
    this.grupoFormRegistro.reset();
  }
}
