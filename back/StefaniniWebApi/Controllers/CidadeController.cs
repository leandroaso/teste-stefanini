using Core.DTOs;
using Core.Endities;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;

namespace StefaniniWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CidadeController : ControllerBase
    {
        private readonly ICidadeService _service;

        public CidadeController(ICidadeService service)
        {
            _service = service;
        }

        [HttpPost]
        public Cidade Insert([FromBody] Cidade cidade)
        {
            return _service.Insert(cidade);
        }

        [HttpPut]
        public void Update([FromBody] Cidade cidade)
        {
            _service.Update(cidade);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            try
            {
                _service.Delete(id);
                return Ok();
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IEnumerable<Cidade> FindBy([FromQuery] string? nome)
        {
            return _service.FindBy(nome);
        }
                
        [HttpGet("by-id")]
        public Cidade GetById([FromQuery] int id)
        {
            return _service.FindBy(id);
        }

        [HttpGet("paginated")]
        public Paginated<CidadeListagemDto> FindByFiltro([FromQuery] Paginated<CidadeListagemDto> paginated, [FromQuery] CidadeListagemDto filtro)
        {
            return _service.FindByFiltro(paginated, filtro);
        }
    }
}
