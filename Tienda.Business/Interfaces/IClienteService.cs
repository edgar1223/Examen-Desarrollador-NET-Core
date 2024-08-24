using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Entities;
using System;

namespace Tienda.Business.Interfaces
{
    public interface IClienteService
    {
        Task<IEnumerable<Cliente>> GetClientesAsync();
        Task<Cliente> GetClienteByIdAsync(int id);
        Task AddClienteAsync(Cliente cliente);
        Task UpdateClienteAsync(Cliente cliente);
        Task DeleteClienteAsync(int id);
        Task RegistrarCompraAsync(int clienteId, int articuloId, DateTime fechaCompra);
    }
}
