using Core.DTOs;
using Core.Endities;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;

namespace StefaniniWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _service;

        public PessoaController(IPessoaService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<Pessoa> Insert([FromBody] Pessoa pessoa)
        {
            try
            {
                return Ok(_service.Insert(pessoa));
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public ActionResult Update([FromBody] Pessoa pessoa)
        {
            try
            {
                _service.Update(pessoa);
                return Ok();
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public void Delete([FromQuery] int id)
        {
            _service.Delete(id);
        }

        [HttpGet]
        public Pessoa FindBy([FromQuery] int id)
        {
            return _service.GetBy(id);
        }

        [HttpGet("paginated")]
        public Paginated<PessoaListagemDto> FindByFiltro([FromQuery] Paginated<PessoaListagemDto> paginated, [FromQuery] FiltroPaginated filtro)
        {
            return _service.FindByFiltro(paginated, filtro);
        }
    }
}
