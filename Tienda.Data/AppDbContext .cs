using Microsoft.EntityFrameworkCore;
using Tienda.Entities;

namespace Tienda.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Tienda.Entities.Tienda> Tiendas { get; set; }

        public DbSet<Articulo> Articulos { get; set; }
        public DbSet<ArticuloTienda> ArticulosTiendas { get; set; }
        public DbSet<ArticuloCliente> ArticuloClientes { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Articulo>()
        .Property(a => a.Precio)
        .HasColumnType("decimal(18,2)");

    modelBuilder.Entity<ArticuloTienda>()
        .HasKey(at => new { at.ArticuloId, at.TiendaId });

    modelBuilder.Entity<ArticuloTienda>()
        .HasOne(at => at.Articulo)
        .WithMany(a => a.Tiendas)
        .HasForeignKey(at => at.ArticuloId);

    modelBuilder.Entity<ArticuloTienda>()
        .HasOne(at => at.Tienda)
        .WithMany(t => t.Articulos)
        .HasForeignKey(at => at.TiendaId);

    modelBuilder.Entity<ArticuloCliente>()
        .HasKey(ac => new { ac.ArticuloId, ac.ClienteId });

    modelBuilder.Entity<ArticuloCliente>()
        .HasOne(ac => ac.Articulo)
        .WithMany(a => a.Clientes)
        .HasForeignKey(ac => ac.ArticuloId);

    modelBuilder.Entity<ArticuloCliente>()
        .HasOne(ac => ac.Cliente)
        .WithMany(c => c.Articulos)
        .HasForeignKey(ac => ac.ClienteId);
}
    }
}