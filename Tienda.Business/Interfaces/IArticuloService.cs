using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Entities;

namespace Tienda.Business.Interfaces
{
    public interface IArticuloService
    {
        Task<IEnumerable<Articulo>> GetArticulosAsync();
        Task<Articulo> GetArticuloByIdAsync(int id);
        Task AddArticuloAsync(Articulo articulo);
        Task UpdateArticuloAsync(Articulo articulo);
        Task DeleteArticuloAsync(int id);
         Task ReducirStockAsync(int articuloId, int cantidad); 
    }
}
