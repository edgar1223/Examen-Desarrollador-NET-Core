using System;

namespace Tienda.Entities
{
    public class ArticuloCliente
    {
        public int ArticuloId { get; set; }
        public Articulo Articulo { get; set; }

        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        public DateTime Fecha { get; set; }
    }
}
