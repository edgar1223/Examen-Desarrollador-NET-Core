using System.Collections.Generic;
namespace Tienda.API.DTOs
{
      public class CarritoCompraDto

    {

        public int ClienteId { get; set; }

        public List<CarritoDto> Carrito { get; set; }

    }
}
