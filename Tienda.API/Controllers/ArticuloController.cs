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

namespace Tienda.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private readonly IArticuloService _articuloService;
        private readonly AppDbContext _context;
        public ArticulosController(IArticuloService articuloService, AppDbContext context)
        {
            _articuloService = articuloService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulos()
        {
            var articulos = await _articuloService.GetArticulosAsync();
            return Ok(articulos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Articulo>> GetArticulo(int id)
        {
            var articulo = await _articuloService.GetArticuloByIdAsync(id);

            if (articulo == null)
            {
                return NotFound();
            }

            return Ok(articulo);
        }


        [HttpPost]
        public async Task<ActionResult> CreateArticulo([FromForm] Articulo articuloDto, [FromForm] IFormFile file)
        {
            if (file != null)
            {
                var uploadResult = await UploadImage(file);
                if (uploadResult is OkObjectResult okResult)
                {
                    var path = (okResult.Value as dynamic).Path;
                    articuloDto.Imagen = path;
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image.");
                }
            }

            var articulo = new Articulo
            {
                Codigo = articuloDto.Codigo,
                Descripcion = articuloDto.Descripcion,
                Precio = articuloDto.Precio,
                Imagen = articuloDto.Imagen,
                Stock = articuloDto.Stock
            };

            await _articuloService.AddArticuloAsync(articulo);
            return CreatedAtAction(nameof(GetArticulo), new { id = articulo.Id }, articulo);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Define the folder path to save the image
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            // Save the file to the folder
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the file path
            var imagePath = $"/images/{fileName}";

            return Ok(new { Path = imagePath });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticulo(int id, [FromForm] Articulo articulo, [FromForm] IFormFile file)
        {
            if (id != articulo.Id)
            {
                return BadRequest("El ID del artículo no coincide.");
            }

            var articuloExistente = await _articuloService.GetArticuloByIdAsync(id);
            if (articuloExistente == null)
            {
                return NotFound("El artículo no existe.");
            }

            if (file?.Length > 0)
            {
                var uploadResult = await UploadImage(file);
                if (uploadResult is OkObjectResult okResult)
                {
                    var path = (okResult.Value as dynamic).Path;
                    articulo.Imagen = path;
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image.");
                }
            }
            else
            {
                articulo.Imagen = articuloExistente.Imagen;
            }

            _context.Entry(articuloExistente).State = EntityState.Detached;

            await _articuloService.UpdateArticuloAsync(articulo);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArticulo(int id)
        {
            await _articuloService.DeleteArticuloAsync(id);
            return NoContent();
        }



    }
}
