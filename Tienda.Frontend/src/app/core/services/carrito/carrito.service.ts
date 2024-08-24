import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Articulos } from '../../../modules/articulos';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarritoCompraDto } from '../../../modules/carrito-compra-dto';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = `${environment.apiUrl}carrito`;
  private cartItemsKey = 'cartItems';
  private cartItems = new BehaviorSubject<Articulos[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();
  constructor(private http: HttpClient) {
    this.cartItems.subscribe(items => this.saveCart(items));
  }
  private loadCart(): Articulos[] {
    const savedItems = localStorage.getItem(this.cartItemsKey);
    return savedItems ? JSON.parse(savedItems) : [];
  }

  private saveCart(items: Articulos[]): void {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(items));
  }

  addToCart(articulo: Articulos): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.Id === articulo.Id);

    if (existingItem) {
      existingItem.Stock += articulo.Stock;
    } else {
      currentItems.push(articulo);
    }

    this.cartItems.next(currentItems);
  }

  removeFromCart(articulo: Articulos): void {
    const updatedItems = this.cartItems.value.filter(item => item.Id !== articulo.Id);
    this.cartItems.next(updatedItems);
  }

  getCartItems(): Articulos[] {
    return this.cartItems.value;
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
  comprar(compra: CarritoCompraDto): Observable<string> {
    return this.http.post(`${this.apiUrl}/comprar`, compra, { responseType: 'text' as 'json' }).pipe(
      map(response => response as string)  // Convertir la respuesta a texto
    );
  }
}
