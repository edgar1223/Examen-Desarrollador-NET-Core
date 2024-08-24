import { Component, ViewChild } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Clientes } from '../../../modules/clientes';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent {
 

  Alerta: boolean = false;
  mensaje: string = '';
  dataSource: MatTableDataSource<Clientes> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'Id',
    'Nombre',
    'Apellidos',
    'Direccion',
    'Acciones',
  ];
  clienteForm!: FormGroup;
  editar: boolean = false;
  idcliente:number=0
  constructor(private fb: FormBuilder, private cleinteService: ClienteService) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.min(0)]],
      direccion: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.obtenerCliente();
  }
  onSubmit() {
    if (this.clienteForm.valid) {
      const formValue = this.clienteForm.value;
      const cliente: Clientes = {
        Nombre: formValue.nombre,
        Apellidos: formValue.apellidos,
        Direccion: formValue.direccion,
        Contraseña: formValue.contraseña,
      };
      this.cleinteService.SaveCliente(cliente).subscribe(
        (repuesta) => {
          this.clienteForm.reset();

          this.clienteForm.patchValue({ imagen: null });
          this.mensaje = 'Guardado con exito';
          this.Alerta = true;
          const delay = 5000;
          setTimeout(() => {
            this.Alerta = false;
          }, delay);
          this.obtenerCliente();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  limpiar() {
    this.clienteForm.reset();
    this.editar = false;
  }
  obtenerCliente() {
    this.cleinteService.getCliente().subscribe(
      (respuesta: Clientes[]) => {
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

  onDelete(cliente: any) {
    this.cleinteService.deleteCliente(cliente.Id).subscribe(() => {
      this.mensaje = 'Articulo eliminado con exito';
      this.Alerta = true;
      const delay = 5000;
      setTimeout(() => {
        this.Alerta = false;
      }, delay);
      this.obtenerCliente();
    },
    (error) => {
      console.error('Error al eliminar el artículo:', error);
    })
  }

  onEdit(cliente: any) {
    this.clienteForm.patchValue({
      nombre: cliente.Nombre,
     
      apellidos: cliente.Apellidos,
      direccion: cliente.Direccion,
    });
    this.idcliente = cliente.Id;
    this.editar = true;
  }
  editarCliente() {
    const formValue = this.clienteForm.value;
    const cliente: Clientes = {
      Id:this.idcliente,
      Nombre: formValue.nombre,
      Apellidos: formValue.apellidos,
      Direccion: formValue.direccion,
      Contraseña: formValue.contraseña,
    };
    this.cleinteService.editarArchivo(this.idcliente ,cliente).subscribe(
      () => {
        this.clienteForm.reset();
          

          
        this.mensaje = 'Articulo ediatao con exito';
        this.Alerta = true;
        const delay = 5000;
        setTimeout(() => {
          this.Alerta = false;
        }, delay);
        this.obtenerCliente();
        this.idcliente = 0;
      },
      (error) => {
        console.error('Error al editar el artículo:', error);
      }
    );
  }
}
