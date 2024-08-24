using System.Collections.Generic;
namespace Tienda.API.DTOs
{
    public class TiendaSummaryDto
    {
        public int Id { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
        public List<ArticuloSummaryDto> Articulos { get; set; }
    }

    
}

