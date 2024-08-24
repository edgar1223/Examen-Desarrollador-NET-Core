import { Articulos } from "./articulos";

export interface Tienda {
  Id?:number,
  Sucursal:String,
  Direccion:String,
  Articulos:Articulos[]
}
