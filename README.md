# Examen - Desarrollador .NET Core

Este repositorio contiene un proyecto de comercio electrónico desarrollado como parte de un examen para una posición de Desarrollador .NET. El proyecto está diseñado con .NET Core (3.1 o superior) y Angular, siguiendo una estructura de 4 capas: Business, Data, Entities, y Front.

## Contenido del Repositorio

- **Tienda.API**: API del proyecto, gestionada en .NET Core.
- **Tienda.Business**: Capa de lógica de negocio.
- **Tienda.Data**: Capa de acceso a datos y configuración de la base de datos.
- **Tienda.Entities**: Contiene las entidades del proyecto.
- **Tienda.Frontend**: Proyecto Angular para el frontend.
- **SQL Scripts**: Scripts de base de datos necesarios para la configuración del esquema.
- **Diagramas y Documentación**: Diagramas de diseño y documentación adicional.

## Requisitos

- .NET Core 3.1 o superior
- Angular
- SQL Server (o el sistema de base de datos que prefieras)

## Instalación

Para configurar el proyecto en tu entorno local, sigue estos pasos:

1. **Clona el Repositorio:**
   ```bash
   git clone https://github.com/edgar1223/Examen-Desarrollador-NET-Core.git
```
2. **Configura la Base de Datos:**
   
   Ejecuta los scripts SQL proporcionados en el directorio `SQL Scripts` para crear las tablas necesarias.

3. **Configura el Backend:**

   Navega al directorio `Tienda.API` y restaura los paquetes NuGet:
   ```bash
   dotnet restore

```
Ejecuta las migraciones para actualizar la base de datos:
```bash
dotnet ef database update


    dotnet ef database update
```

Configura el Frontend:

    Navega al directorio Tienda.Frontend y instala las dependencias de Angular:

    ```bash


npm install
```

Ejecuta el proyecto Angular:

bash
    ```bash

    ng serve
```
Ejecuta el Backend:

    Navega al directorio Tienda.API y ejecuta el proyecto:

        ```bash


        dotnet run
```
## Funcionalidades

- **CRUD de Tienda**: Permite crear, leer, actualizar y eliminar tiendas.
- **CRUD de Artículo**: Permite gestionar artículos, incluyendo su relación con tiendas.
- **CRUD de Cliente**: Permite gestionar clientes y sus compras.
- **Autenticación**: Sistema de autenticación para clientes.
- **Carrito de Compras**: Permite a los clientes añadir artículos a su carrito y realizar compras.

## Tecnologías Utilizadas

- **Backend**: .NET Core (3.1 o superior)
- **Frontend**: Angular
- **Base de Datos**: SQL Server

## Contacto

Para cualquier pregunta o comentario, puedes contactar al autor del proyecto:

**Nombre**: Edgar David Jiménez Jijon  
**Correo Electrónico**: dgr36877@gmail.com
