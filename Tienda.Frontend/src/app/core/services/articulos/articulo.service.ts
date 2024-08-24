import { Injectable } from '@angular/core';
import { Articulos } from '../../../modules/articulos';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getArticulo():Observable<Articulos[]>{
    return this.http.get<Articulos[]>(`${this.apiUrl}Articulos`)
  }
  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Articulos/${id}`);
  }
  SaveArticulo(articulo:Articulos, img:File):Observable<Articulos>{
    const formData = new FormData();
    
    formData.append('codigo', articulo.Codigo as string);
    formData.append('descripcion', articulo.Descripcion as string);
    formData.append('Precio', articulo.Precio.toString());
    formData.append('Stock', articulo.Stock.toString());
    
    formData.append('file', img, img.name);

    return this.http.post<Articulos>(`${this.apiUrl}Articulos`, formData);
  }
  editarArchivo(id:number,formData:FormData ):Observable<void>{

    return this.http.put<void>(`${this.apiUrl}Articulos/${id}`, formData)
  }
}
