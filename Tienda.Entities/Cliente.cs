using System.Collections.Generic;

namespace Tienda.Entities
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Contraseña { get; set; }
        public ICollection<ArticuloCliente> Articulos { get; set; }
    }
}
