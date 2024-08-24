using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Business.Interfaces;
using Tienda.Entities;
namespace Tienda.API.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("registrar")]
    public IActionResult Registrar(Cliente cliente)
    {
        _authService.RegistrarCliente(cliente);
        return Ok();
    }

   [HttpPost("login")]
public IActionResult Login([FromBody] LoginDto loginDto)
{
    if (loginDto == null || string.IsNullOrEmpty(loginDto.Nombre) || string.IsNullOrEmpty(loginDto.Contraseña))
    {
        return BadRequest("Nombre de usuario y contraseña son requeridos.");
    }

    var token = _authService.Login(loginDto.Nombre, loginDto.Contraseña);
    if (token == null)
        return Unauthorized();

    return Ok(new { Token = token });
}
}

public class LoginDto
{
    public string Nombre { get; set; }
    public string Contraseña { get; set; }
}

}