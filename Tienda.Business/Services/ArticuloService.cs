using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Data;
using Tienda.Entities;
using Tienda.Business.Interfaces;

namespace Tienda.Business.Services
{
    public class ArticuloService : IArticuloService
    {
        private readonly AppDbContext _context;

        public ArticuloService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Articulo>> GetArticulosAsync()
        {
            return await _context.Articulos.ToListAsync();
        }

        public async Task<Articulo> GetArticuloByIdAsync(int id)
        {
            return await _context.Articulos.FindAsync(id);
        }

        public async Task AddArticuloAsync(Articulo articulo)
        {
            _context.Articulos.Add(articulo);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateArticuloAsync(Articulo articulo)
        {
            _context.Articulos.Update(articulo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteArticuloAsync(int id)
        {
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo != null)
            {
                _context.Articulos.Remove(articulo);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ReducirStockAsync(int articuloId, int cantidad)
        {
            var articulo = await _context.Articulos.FindAsync(articuloId);
            if (articulo == null)
            {
                throw new KeyNotFoundException($"Artículo con ID {articuloId} no encontrado");
            }

            if (articulo.Stock < cantidad)
            {
               throw new InvalidOperationException($"Stock insuficiente. Disponible: {articulo.Stock}, solicitado: {cantidad}");
            }

            articulo.Stock -= cantidad;
            _context.Articulos.Update(articulo);
            await _context.SaveChangesAsync();
        }

    }
}
