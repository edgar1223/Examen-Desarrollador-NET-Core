import { Component } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito/carrito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  cartItemCount: number = 0;
userId: any;
  constructor(private cartService: CarritoService) {}
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.Stock, 0);
    });
  }
}
