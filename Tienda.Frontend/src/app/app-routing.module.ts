import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './shared/components/tabla/tabla.component';
import { TablaArticulosComponent } from './shared/components/tabla-articulos/tabla-articulos.component';
import { TablaTiendaComponent } from './shared/components/tabla-tienda/tabla-tienda.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ArticulosListComponent } from './shared/components/articulos-list/articulos-list.component';

const routes: Routes = [
  { path: 'articulos', component: TablaArticulosComponent,canActivate: [AuthGuard] },
  { path: 'cliente', component: TablaComponent ,canActivate: [AuthGuard]},
  { path: 'tienda', component: TablaTiendaComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'carrito', component: ArticulosListComponent,canActivate: [AuthGuard] },
  
  { path: '', redirectTo: 'cliente', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
