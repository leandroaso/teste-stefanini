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

        [HttpGet]
        public IEnumerable<Cidade> FindBy([FromQuery] string? nome)
        {
            return _service.FindBy(nome);
        }
    }
}
