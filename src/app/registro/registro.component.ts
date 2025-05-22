import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonicModule, NgxMaskDirective, FormsModule]
})

export class RegistroComponent  implements OnInit {
  email: string = ''
  contrasena: string = ''
  fechaNac: string = ''
  telefono: string = ''
  form!: FormGroup

  constructor(private router: Router) {}

  ngOnInit() {}

  // Navegar a login
  navegarLogin(){
    this.router.navigateByUrl('/login')
  }

  // Crear cuenta
  crearCuenta(){

    // Validación de campos
    if (!this.email || !this.contrasena || !this.fechaNac || !this.telefono) {
      console.log('Todos los campos son obligatorios');
      console.log(this.email + " " + this.contrasena + " " + this.fechaNac + " " + this.telefono);
      return;
    }
    
    // Array actual localStorage
    const usuariosJSON = localStorage.getItem('usuarios'); // Obtener el array actual de usuarios del localStorage
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : []; // Si está vacío, devuelve array vacío

    // Crear array nuevo usuario
    const nuevoUsuario = {
      nombre: this.email,
      email: this.contrasena,
      password: this.fechaNac,
      telefono: this.telefono,
    };

    // Agregar nuevo usuario al array
    usuarios.push(nuevoUsuario);

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(this.email + " registrado correctamente.")

    // Resetear campos
    this.email = '';
    this.contrasena = '';
    this.fechaNac = '';
    this.telefono = '';
  }
}
