using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Business.Interfaces;
using Tienda.Entities;

namespace Tienda.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendasController : ControllerBase
    {
        private readonly ITiendaService _tiendaService;

        public TiendasController(ITiendaService tiendaService)
        {
            _tiendaService = tiendaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tienda.Entities.Tienda>>> GetTiendas()
        {
            var tiendas = await _tiendaService.GetTiendasAsync();
            return Ok(tiendas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tienda.Entities.Tienda>> GetTienda(int id)
        {
            var tienda = await _tiendaService.GetTiendaByIdAsync(id);

            if (tienda == null)
            {
                return NotFound();
            }

            return Ok(tienda);
        }

        [HttpPost]
        public async Task<ActionResult> CreateTienda([FromBody] Tienda.Entities.Tienda tienda)
        {
            await _tiendaService.AddTiendaAsync(tienda);
            return CreatedAtAction(nameof(GetTienda), new { id = tienda.Id }, tienda);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTienda(int id, [FromBody] Tienda.Entities.Tienda tienda)
        {
            if (id != tienda.Id)
            {
                return BadRequest();
            }

            await _tiendaService.UpdateTiendaAsync(tienda);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTienda(int id)
        {
            await _tiendaService.DeleteTiendaAsync(id);
            return NoContent();
        }
    }
}
