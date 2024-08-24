using BCrypt.Net;
using Tienda.Data;
using Tienda.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Linq;

namespace Tienda.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public void RegistrarCliente(Cliente cliente)
        {
            cliente.Contraseña = BCrypt.Net.BCrypt.HashPassword(cliente.Contraseña);
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
        }

        public string Login(string nombre, string contraseña)
        {
            if (string.IsNullOrEmpty(nombre) || string.IsNullOrEmpty(contraseña))
            {
                throw new ArgumentException("El nombre de usuario y la contraseña no pueden estar vacíos.");
            }

            // Obtén el usuario desde el contexto
            var user = _context.Clientes.FirstOrDefault(c => c.Nombre == nombre);

            if (user == null)
            {
                return null;
            }

            // Verifica la contraseña
            bool passwordMatch = BCrypt.Net.BCrypt.Verify(contraseña, user.Contraseña);
            if (passwordMatch)
            {
                // Generar y retornar el token
                return GenerarToken(user);
            }

            return null;
        }

        private string GenerarToken(Cliente cliente)
        {
            var claveSecreta = "clave_super_secreta_para_firmar_el_token";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(claveSecreta));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, cliente.Nombre),
                new Claim("clienteId", cliente.Id.ToString()),
                new Claim("clienteNombre", cliente.Nombre),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "tu_app",
                audience: "tu_app",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
