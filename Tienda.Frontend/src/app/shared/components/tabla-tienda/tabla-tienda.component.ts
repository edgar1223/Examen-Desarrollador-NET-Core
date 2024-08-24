import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from '../../../core/services/tienda/tienda.service';
import { MatTableDataSource } from '@angular/material/table';
import { Tienda } from '../../../modules/tienda';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Articulos } from '../../../modules/articulos';
import { ArticuloService } from '../../../core/services/articulos/articulo.service';

@Component({
  selector: 'app-tabla-tienda',
  templateUrl: './tabla-tienda.component.html',
  styleUrl: './tabla-tienda.component.css',
})
export class TablaTiendaComponent {
 
  
  tiendaForm!: FormGroup;
  mensaje: string = '';
  displayedColumns: string[] = [
    'Sucursal',
    'Direccion',
    'Articulo',
    'Acciones',
  ];
  Alerta: boolean = false;
  editar: boolean = false;
  idTienda: number = 0;
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  articulosDisponibles: Articulos[] = [];
  articulosSeleccionados: Articulos[] = [];
  constructor(
    private tiendaServices: TiendaService,
    private fb: FormBuilder,
    private articuloService: ArticuloService
  ) {
    this.tiendaForm = this.fb.group({
      sucursal: ['', Validators.required],
      direccion: ['', Validators.required],
      articulos: this.fb.array([]),
    });
  }

  obtenerArtiuclo() {
    this.articuloService.getArticulo().subscribe(
      (respuesta: Articulos[]) => {
        this.articulosDisponibles = respuesta;
      },
      (error) => {
        console.error('ocurrio un error', error);
      }
    );
  }

  addArticulo2(articulos: Articulos) {
    this.articulosSeleccionados.push(articulos);
  }

  removeArticulo(index: number) {
    this.articulosSeleccionados.splice(index, 1);
  }
  onSubmit() {
    if (this.tiendaForm.valid ) {
      const formValue = this.tiendaForm.value;
      const tienda: Tienda = {
        Sucursal: formValue.sucursal,
        Direccion: formValue.direccion,
      
        Articulos: this.articulosSeleccionados,
        
      };
      this.tiendaServices
        .SaveCliente(tienda)
        .subscribe((respuesta) => {
          this.tiendaForm.reset();
          
          this.mensaje = 'Guardado con exito';
          this.Alerta = true;
          const delay = 5000;
          setTimeout(() => {
            this.Alerta = false;
          }, delay);
          this.obtenerTinenda();
        });
    }
  }

  ngOnInit() {
    this.obtenerTinenda();
    this.obtenerArtiuclo();
  }
  obtenerTinenda() {
    this.tiendaServices.getCliente().subscribe(
      (respuesta: Tienda[]) => {
        console.log(respuesta);
        this.dataSource.data = respuesta;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('ocurrio un error', error);
      }
    );
  }
  limpiar() {
    this.tiendaForm.reset();
  }
  onDelete(tienda: any) {
    this.tiendaServices.deleteCliente(tienda.Id).subscribe(() => {
      this.mensaje = 'Articulo eliminado con exito';
      this.Alerta = true;
      const delay = 5000;
      setTimeout(() => {
        this.Alerta = false;
      }, delay);
      this.obtenerTinenda();
    },
    (error) => {
      console.error('Error al eliminar el artículo:', error);
    })
  }
  onEdit(tienda: any) {
    this.tiendaForm.patchValue({
      sucursal: tienda.Sucursal,
      direccion: tienda.Direccion,
     
    });
    this.articulosSeleccionados = tienda.Articulos.map((articulo: any) => articulo.Articulo);
    this.idTienda = tienda.Id;
    this.editar = true;
  }
  editarTienda() {
    const formValue = this.tiendaForm.value;
    const tienda: Tienda = {
      Id:this.idTienda,
      Sucursal: formValue.sucursal,
      Direccion: formValue.direccion,
      Articulos: this.articulosSeleccionados,
      
    };
    this.tiendaServices.editarTienda(this.idTienda ,tienda).subscribe(
      () => {
        this.tiendaForm.reset();
          

          
        this.mensaje = 'Articulo ediatao con exito';
        this.Alerta = true;
        const delay = 5000;
        setTimeout(() => {
          this.Alerta = false;
        }, delay);
        this.obtenerTinenda();
        this.idTienda = 0;
      },
      (error) => {
        console.error('Error al editar el artículo:', error);
      }
    );
  }
}
