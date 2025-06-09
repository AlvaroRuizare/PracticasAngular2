import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'http://172.26.100.123:8080/ittws3/webresources/post';

  constructor(private http: HttpClient) {}

  getArticuloById(idRecibido : string | null | undefined): Observable<any> {
    const body = {
        "metodo": "getArticuloById",
        "almacen": 1,
        "centro": 1,
        "empresa": null,
        "parametro1": "",
        "parametro2": "",
        "parametro3": "",
        "parametro4": "",
        "parametro5": "",
        "parametro6": "",
        "parametro7": "",
        parametros: JSON.stringify({
            idArticulo: idRecibido,
            opcion: 1,
            ubicacion: ""
          }),
        "listaparametros": [],
        "tracking": "",
        "password": "admin",
        "usuario": "admin",
        "version": "1.1.1.63"
    }
    
    return this.http.post<any>(this.apiUrl, body);
  }
}
