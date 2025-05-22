import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonicModule, NgxMaskDirective]
})

export class RegistroComponent  implements OnInit {

  form!: FormGroup

  constructor(private router: Router) {}

  ngOnInit() {}

  // Navegar a login
  navegarLogin(){
    this.router.navigateByUrl('/login')
  }
}
