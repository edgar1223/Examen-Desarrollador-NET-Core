using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Data;
using Tienda.Entities;
using Tienda.Business.Interfaces;
using BCrypt.Net;
using System;

namespace Tienda.Business.Services
{
    public class ClienteService : IClienteService
    {
        private readonly AppDbContext _context;

        public ClienteService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cliente>> GetClientesAsync()
        {
            return await _context.Clientes.ToListAsync();
        }

        public async Task<Cliente> GetClienteByIdAsync(int id)
        {
            return await _context.Clientes.FindAsync(id);
        }

        public async Task AddClienteAsync(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateClienteAsync(Cliente cliente)
        {
            cliente.Contraseña = BCrypt.Net.BCrypt.HashPassword(cliente.Contraseña);
            _context.Clientes.Update(cliente);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClienteAsync(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();
            }
        }
         public async Task RegistrarCompraAsync(int clienteId, int articuloId, DateTime fechaCompra)
    {
        var compra = new ArticuloCliente
        {
            ClienteId = clienteId,
            ArticuloId = articuloId,
            Fecha = fechaCompra
        };

        _context.ArticuloClientes.Add(compra);
        await _context.SaveChangesAsync();
    }
    }
}

