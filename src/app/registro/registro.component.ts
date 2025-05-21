import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Dependencia Router para navegar

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: false
})

export class RegistroComponent  implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // Navegar a login
  navegarLogin(){
    this.router.navigateByUrl('/login')
  }
}
