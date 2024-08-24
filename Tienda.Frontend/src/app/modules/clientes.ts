import { Articulos } from "./articulos"

export interface Clientes {
    Id?:number,
    Nombre:String,
    Apellidos:String,
    Contraseña:string
    Direccion:String,
    Articulos?:any[]
}
