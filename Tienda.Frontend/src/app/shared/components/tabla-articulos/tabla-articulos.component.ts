import { Component, ViewChild } from '@angular/core';
import { Articulos } from '../../../modules/articulos';
import { ArticuloService } from '../../../core/services/articulos/articulo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService } from '../../../core/services/carrito/carrito.service';

@Component({
  selector: 'app-tabla-articulos',
  templateUrl: './tabla-articulos.component.html',
  styleUrl: './tabla-articulos.component.css',
})
export class TablaArticulosComponent {
  selectedFile: File | null = null;
  apiImg = environment.apiImg;
  articuloForm!: FormGroup;
  mensaje: string = '';
  displayedColumns: string[] = [
    'Id',
    'Codigo',
    'Descripcion',
    'Precio',
    'Imagen',
    'Stock',
    'Acciones',
  ];
  Alerta: boolean = false;
  editar: boolean = false;
  idArticulo: number = 0;
  dataSource: MatTableDataSource<Articulos> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private articuloService: ArticuloService,
    private fb: FormBuilder,
    private cartService: CarritoService
  ) {}
  ngOnInit() {
    this.articuloForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imagen: [null, Validators.required],
    });
    this.obtenerArtiuclo();
  }
  obtenerArtiuclo() {
    this.articuloService.getArticulo().subscribe(
      (respuesta: Articulos[]) => {
        this.dataSource.data = respuesta;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('ocurrio un error', error);
      }
    );
  }
  aplicarFiltro(event: Event): void {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  onEdit(articulo: any) {
    this.articuloForm.patchValue({
      codigo: articulo.Codigo,
      descripcion: articulo.Descripcion,
      precio: articulo.Precio,
      stock: articulo.Stock,
    });
    this.idArticulo = articulo.Id;
    this.editar = true;
  }
  agregarAlCarrito(articulo: Articulos): void {
    const articuloCarrito:Articulos={
      Id:articulo.Id,
      Codigo: articulo.Codigo,
      Descripcion: articulo.Descripcion,
      Precio: articulo.Precio,
      Stock: 1,
      
      Imagen: articulo.Imagen,
    };
    
    this.cartService.addToCart(articuloCarrito);
  }
  onDelete(articulo: any) {
    this.articuloService.deleteArticulo(articulo.Id).subscribe(
      () => {
        this.mensaje = 'Articulo eliminado con exito';
        this.Alerta = true;
        const delay = 5000;
        setTimeout(() => {
          this.Alerta = false;
        }, delay);
        this.obtenerArtiuclo();
      },
      (error) => {
        console.error('Error al eliminar el artículo:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.articuloForm.valid && this.selectedFile != null) {
      const formValue = this.articuloForm.value;
      const articulo: Articulos = {
        Codigo: formValue.codigo,
        Descripcion: formValue.descripcion,
        Precio: formValue.precio,
        Stock: formValue.stock,
        Id: 0,
        Imagen: '',
      };
      this.articuloService
        .SaveArticulo(articulo, this.selectedFile)
        .subscribe((respuesta) => {
          this.articuloForm.reset();
          this.selectedFile = null;

          this.articuloForm.patchValue({ imagen: null });
          this.mensaje = 'Guardado con exito';
          this.Alerta = true;
          const delay = 5000;
          setTimeout(() => {
            this.Alerta = false;
          }, delay);
          this.obtenerArtiuclo();
        });
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.articuloForm.patchValue({
        imagen: file,
      });
    }
  }
  limpiar() {
    this.articuloForm.reset();
    this.selectedFile = null;

    this.articuloForm.patchValue({ imagen: null });
    this.editar = false;
  }
  editarArticulo() {
    const formValue = this.articuloForm.value;
    const formData = new FormData();

    // Añadir los campos del artículo al FormData
    formData.append('codigo', formValue.codigo);
    formData.append('descripcion', formValue.descripcion);
    formData.append('Precio', formValue.precio.toString());
    formData.append('Stock', formValue.stock.toString());
    formData.append('id', this.idArticulo.toString());
    console.log(this.selectedFile)
    if (this.selectedFile != null) {
      console.log("entre")
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.articuloService.editarArchivo(this.idArticulo, formData).subscribe(
      () => {
        this.articuloForm.reset();
          this.selectedFile = null;

          this.articuloForm.patchValue({ imagen: null });
        this.mensaje = 'Articulo ediatao con exito';
        this.Alerta = true;
        const delay = 5000;
        setTimeout(() => {
          this.Alerta = false;
        }, delay);
        this.obtenerArtiuclo();
        this.idArticulo = 0;
      },
      (error) => {
        console.error('Error al editar el artículo:', error);
      }
    );
  }
}
