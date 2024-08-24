import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaComponent } from './shared/components/tabla/tabla.component';
import { TablaArticulosComponent } from './shared/components/tabla-articulos/tabla-articulos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaTiendaComponent } from './shared/components/tabla-tienda/tabla-tienda.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ArticulosListComponent } from './shared/components/articulos-list/articulos-list.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    TablaArticulosComponent,
    MenuComponent,
    TablaTiendaComponent,
    LoginComponent,
    ArticulosListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
