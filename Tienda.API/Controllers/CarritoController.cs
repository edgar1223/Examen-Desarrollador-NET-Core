using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Business.Interfaces;
using Tienda.Entities;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Logging;
using Tienda.Data;
using Microsoft.EntityFrameworkCore;
using System;
using Tienda.API.DTOs;
namespace Tienda.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarritoController : ControllerBase
    {
        private readonly IArticuloService _articuloService;
        private readonly IClienteService _clienteService;

        public CarritoController(IArticuloService articuloService, IClienteService clienteService)
        {
            _articuloService = articuloService;
            _clienteService = clienteService;
        }

        [HttpPost("comprar")]
        public async Task<IActionResult> Comprar([FromBody] CarritoCompraDto compra)
        {
            try
            {
                foreach (var item in compra.Carrito)
                {
                    await _articuloService.ReducirStockAsync(item.ArticuloId, item.Cantidad);
                    await _clienteService.RegistrarCompraAsync(compra.ClienteId, item.ArticuloId, DateTime.Now);

                }

                return Ok("Compra realizada con éxito.");
            }
            catch (Exception ex)
            {
                if (ex.Message == "Stock insuficiente")
                {
                    return BadRequest("No hay suficiente stock para completar la compra.");
                }
                return StatusCode(500, "Se produjo un error inesperado: " + ex.Message);
            }
        }
    }

  
}
