// Primer archivo cargado por la aplicación

import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root', // id para llamar a la página desde el html
  templateUrl: 'app.component.html', // html que usa la página
  styleUrls: ['app.component.scss'], // css que usa la página
  standalone: false,
})
export class AppComponent {
  constructor(private translate: TranslateService) {}
}
