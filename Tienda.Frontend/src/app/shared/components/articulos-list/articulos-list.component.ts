import { Component } from '@angular/core';
import { Articulos } from '../../../modules/articulos';
import { CarritoService } from '../../../core/services/carrito/carrito.service';

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrl: './articulos-list.component.css'
})
export class ArticulosListComponent {
  articulos: Articulos[] = [];
  userId!: number ;
  total: number = 0;
  mensaje: string = '';
  Alerta: boolean = false;
  Error: boolean = false;
  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.loadArticulosFromLocalStorage();
    this.calculateTotal();
  }

  loadArticulosFromLocalStorage(): void {
    const items = localStorage.getItem('cartItems');
    if (items) {
      try {
        this.articulos = JSON.parse(items) as Articulos[];
        this.calculateTotal();
      } catch (e) {
        console.error('Error al parsear los artículos desde localStorage', e);
      }
    }
  }
  calculateTotal(): void {
    this.total = this.articulos.reduce((sum, articulo) => sum + (articulo.Stock * articulo.Precio), 0);
  }
  comprar(): void {
    const carritoCompra = {
      ClienteId: this.userId,
      Carrito: this.articulos.map(articulo => ({
        articuloId: articulo.Id, 
        cantidad: articulo.Stock
      }))
    };

    this.carritoService.comprar(carritoCompra).subscribe(
      response => {
        this.mensaje = 'Compra realizada con éxito';
        this.Alerta = true;
        
        localStorage.removeItem('cartItems');
        this.articulos = [];
          const delay = 5000;
          setTimeout(() => {
            this.Alerta = false;
          }, delay);
      },
      error => {
        console.error('Error al realizar la compra', error);
        this.mensaje = error.error;
        this.loadArticulosFromLocalStorage();
        this.Error = true;
          const delay = 5000;
          setTimeout(() => {
            this.Alerta = false;
          }, delay);
      }
    );
  }
  reducirStock(articulo: Articulos): void {
    if (articulo.Stock > 0) {
      articulo.Stock -= 1;
  
      localStorage.setItem('cartItems', JSON.stringify(this.articulos));
  
      this.calculateTotal();
    } else {
      this.mensaje = 'No hay suficiente stock para reducir';
      this.Error = true;
      const delay = 5000;
      setTimeout(() => {
        this.Error = false;
      }, delay); }
  }
}
