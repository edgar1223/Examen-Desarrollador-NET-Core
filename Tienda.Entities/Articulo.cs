using System.Collections.Generic;

namespace Tienda.Entities
{
    public class Articulo
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public string Imagen { get; set; }
        public int Stock { get; set; }

        public ICollection<ArticuloCliente> Clientes { get; set; }
        public ICollection<ArticuloTienda> Tiendas { get; set; }
    }
}
