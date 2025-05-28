import { Component, OnInit, TrackByFunction } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  standalone: false
})
export class ListadoPage implements OnInit {
  usuarioLogueado : any
  arrayUsuariosLS : any[] = []


  constructor() { }

  ngOnInit() {
    // Obtener usuarios para mostrarlos
    this.obtenerUsuarios()

    // Obtener usuario logueado para obtener tipo de usuario
    var usuarioLogueadoSS = sessionStorage.getItem('usuarioLogueado')
    this.usuarioLogueado = usuarioLogueadoSS == null ? [] : JSON.parse(usuarioLogueadoSS) // Si el sessionStorage está vacío, por defecto array vacío. Si no, el valor del sessionStorage
  }

  obtenerUsuarios(){
    // Array actual localStorage
    const jsonUsuariosLS = localStorage.getItem('usuarios'); // Obtener el array actual de usuarios del localStorage
    this.arrayUsuariosLS = jsonUsuariosLS ? JSON.parse(jsonUsuariosLS) : []; // Si está vacío, devuelve array vacío
  }

  borrarUsuario(indiceUsuarioClicado: number) {
    // Diálogo de confirmación
    Swal.fire({
      title: "Borrar usuario",
      text: "¿Estás seguro?",
      icon: "warning",
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usuarios"); // Borrar tabla usuarios del localStorage

        const emailBorrado = this.arrayUsuariosLS[indiceUsuarioClicado].email // Guardar nombre email antes de borrar

        this.arrayUsuariosLS.splice(indiceUsuarioClicado, 1) // Borrar usuario del array de usuarios

        localStorage.setItem("usuarios", JSON.stringify(this.arrayUsuariosLS)); // Subir nuevo array de usuarios al localStorage

        Swal.fire({
          title: "Usuario borrado!",
          heightAuto: false,
          text: "El usuario " + emailBorrado + " ha sido borrado.",
          icon: "success"
        });
      }
    });
  }
}
