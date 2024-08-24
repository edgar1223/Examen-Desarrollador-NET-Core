import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../../../modules/tienda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCliente():Observable<Tienda[]>{
    return this.http.get<Tienda[]>(`${this.apiUrl}Tiendas`)
  }
  SaveCliente(tienda:Tienda):Observable<Tienda>{
    
    const articulosFormateados = tienda.Articulos.map(articulo => {
      return { articuloId: articulo.Id };
    });
  
    const tiendaFormateada = {
      Sucursal: tienda.Sucursal,
      Direccion: tienda.Direccion,
      Articulos: articulosFormateados
    };
  
    return this.http.post<Tienda>(`${this.apiUrl}Tiendas`, tiendaFormateada);
  }
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Tiendas/${id}`);
  }
  editarTienda(id:number,tienda:Tienda ):Observable<void>{
    const articulosFormateados = tienda.Articulos.map(articulo => {
      return { articuloId: articulo.Id };
    });
  
    const tiendaFormateada = {
      Id:id,
      Sucursal: tienda.Sucursal,
      Direccion: tienda.Direccion,
      Articulos: articulosFormateados
    };
  
    return this.http.put<void>(`${this.apiUrl}Tiendas/${id}`, tiendaFormateada)
  }
}
