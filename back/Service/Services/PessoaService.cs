using Core.DTOs;
using Core.Endities;
using Infrastructure.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _repository;
        public PessoaService(IPessoaRepository repository)
        {
            _repository = repository;
        }

        public Paginated<PessoaListagemDto> FindByFiltro(Paginated<PessoaListagemDto> paginated, FiltroPaginated filtro)
        {
            return _repository.GetByFiltro(paginated, filtro);
        }

        public Pessoa GetBy(int id)
        {
            return _repository.GetBy(id);
        }

        public Pessoa Insert(Pessoa pessoa)
        {
            return _repository.Insert(pessoa);
        }

        public void Update(Pessoa pessoa)
        {
            _repository.Update(pessoa);
        }
    }
}
