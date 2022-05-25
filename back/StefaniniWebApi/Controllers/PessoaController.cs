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
        public Pessoa Insert([FromBody] Pessoa pessoa)
        {
            return _service.Insert(pessoa);
        }

        [HttpPut]
        public void Update([FromBody] Pessoa pessoa)
        {
            _service.Update(pessoa);
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
