using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Entities;

namespace Tienda.Business.Interfaces
{
    public interface ITiendaService
    {
        Task<IEnumerable<object>> GetTiendasAsync();
        Task<Tienda.Entities.Tienda> GetTiendaByIdAsync(int id);
        Task AddTiendaAsync(Tienda.Entities.Tienda tienda);
        Task UpdateTiendaAsync(Tienda.Entities.Tienda tienda);
        Task DeleteTiendaAsync(int id);
    }
}
