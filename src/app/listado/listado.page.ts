import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../registro/registro.component';
import { MatTabsModule } from '@angular/material/tabs';
import { trigger, transition, style, animate } from '@angular/animations';
import { ArticuloService } from '../articulo.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule, MatTabsModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // cuando el elemento aparece
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ])
  ]
})

export class ListadoPage implements OnInit {
  usuarioLogueado : any
  arrayUsuariosLS : any[] = []
  indiceSeleccionado = 0; // Se muestra por defecto la pestaña de usuarios
  articulo: any = null;
  barraBusqueda: any;

  constructor(private modalCtrl: ModalController, private articuloService: ArticuloService) { }


  ngOnInit() {
    // Obtener usuarios para mostrarlos
    this.obtenerUsuarios()

    // Obtener usuario logueado para obtener tipo de usuario
    var usuarioLogueadoSS = sessionStorage.getItem('usuarioLogueado')
    this.usuarioLogueado = usuarioLogueadoSS == null ? [] : JSON.parse(usuarioLogueadoSS) // Si el sessionStorage está vacío, por defecto array vacío. Si no, el valor del sessionStorage

    
  }


  // Obtener todos los usuarios y guardarlos en la variable de clase arrayUsuariosLS
  obtenerUsuarios(){
    // Array actual localStorage
    const jsonUsuariosLS = localStorage.getItem('usuarios'); // Obtener el array actual de usuarios del localStorage
    this.arrayUsuariosLS = jsonUsuariosLS ? JSON.parse(jsonUsuariosLS) : []; // Si está vacío, devuelve array vacío
  }


  // Abrir popup modificaciones y enviar datos del usuario clicado
  async abrirModalModificar(idUsuario: number, usuario: any) {
    const modal = await this.modalCtrl.create({
      component: RegistroComponent,
      cssClass: 'modalTransparente',
      componentProps: {
        idUsuario,
        usuario
      }
    });
    await modal.present();
  }


  // Borrar usuario listado
  borrarUsuario(indiceUsuarioClicado: number, event: Event) {
    // Traemos event para que no se clique a la tarjeta del fondo
    event.stopPropagation();
    
    // Diálogo de confirmación
    Swal.fire({
      title: "Borrar usuario",
      text: "¿Estás seguro?",
      icon: "warning",
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usuarios"); // Borrar tabla usuarios del localStorage

        const emailBorrado = this.arrayUsuariosLS[indiceUsuarioClicado].email // Guardar nombre email antes de borrar

        this.arrayUsuariosLS.splice(indiceUsuarioClicado, 1) // Borrar usuario del array de usuarios

        localStorage.setItem("usuarios", JSON.stringify(this.arrayUsuariosLS)); // Subir nuevo array de usuarios al localStorage

        Swal.fire({
          title: "¡Usuario borrado!",
          heightAuto: false,
          text: "El usuario " + emailBorrado + " ha sido borrado.",
          icon: "success"
        });
      }
    });
  }

  filtrarArticulos(valorCampo : string | null | undefined){
    // Obtener articulo de servicio
    this.articuloService.getArticuloById(valorCampo).subscribe({
      next: (data) => {
        this.articulo = data?.articuloConsulta?.articulo;
      },
      error: (err) => {
        console.error('Error al obtener el artículo', err);
      }
    });
  }
}
