using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Data;
using Tienda.Entities;
using Tienda.Business.Interfaces;
using System.Linq;
using System;

namespace Tienda.Business.Services
{
    public class TiendaService : ITiendaService
    {
        private readonly AppDbContext _context;

        public TiendaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetTiendasAsync()
        {
            return await _context.Tiendas
     .Include(t => t.Articulos)
     .ThenInclude(at => at.Articulo)
     .Select(t => new
     {
         t.Id,
         t.Sucursal,
         t.Direccion,
         Articulos = t.Articulos.Select(at => new
         {
             at.ArticuloId,
             Articulo = new
             {
                 at.Articulo.Id,
                 at.Articulo.Codigo,
                 at.Articulo.Descripcion,
                 at.Articulo.Precio,
                 at.Articulo.Imagen,
                 at.Articulo.Stock
             },
             at.TiendaId,
             at.Fecha
         })
     })
     .ToListAsync();
        }

        public async Task<Tienda.Entities.Tienda> GetTiendaByIdAsync(int id)
        {
            return await _context.Tiendas.FindAsync(id);
        }

        public async Task AddTiendaAsync(Tienda.Entities.Tienda tienda)
        {
            _context.Tiendas.Add(tienda);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTiendaAsync(Tienda.Entities.Tienda tienda)
        {
            var existingTienda = await _context.Tiendas
         .Include(t => t.Articulos)
         .FirstOrDefaultAsync(t => t.Id == tienda.Id);

            if (existingTienda == null)
            {
                throw new ArgumentException("La tienda no existe.");
            }

            var existingArticuloIds = existingTienda.Articulos.Select(a => a.ArticuloId).ToList();
            var newArticuloIds = tienda.Articulos.Select(a => a.ArticuloId).ToList(); 

            var articulesToRemove = existingTienda.Articulos
                .Where(a => !newArticuloIds.Contains(a.ArticuloId))
                .ToList();

            var articulesToAdd = tienda.Articulos
                .Where(a => !existingArticuloIds.Contains(a.ArticuloId))
                .Select(a => new ArticuloTienda { ArticuloId = a.ArticuloId, TiendaId = tienda.Id, Fecha = DateTime.UtcNow  }) 
                .ToList();

            _context.ArticulosTiendas.RemoveRange(articulesToRemove);

            _context.ArticulosTiendas.AddRange(articulesToAdd);

            existingTienda.Sucursal = tienda.Sucursal;
            existingTienda.Direccion = tienda.Direccion;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteTiendaAsync(int id)
        {
            var tienda = await _context.Tiendas.FindAsync(id);
            if (tienda != null)
            {
                _context.Tiendas.Remove(tienda);
                await _context.SaveChangesAsync();
            }
        }
    }
}