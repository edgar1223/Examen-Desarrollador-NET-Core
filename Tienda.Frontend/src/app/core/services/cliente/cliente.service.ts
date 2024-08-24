import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Clientes } from '../../../modules/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCliente():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(`${this.apiUrl}clientes`)
  }
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}clientes/${id}`);
  }
  SaveCliente(cleinte:Clientes):Observable<Clientes>{
    

    return this.http.post<Clientes>(`${this.apiUrl}auth/registrar`, cleinte);
  }
  editarArchivo(id:number,cleinte:Clientes ):Observable<void>{

    return this.http.put<void>(`${this.apiUrl}clientes/${id}`, cleinte)
  }
}
