using Core.DTOs;
using Core.Endities;
using Infrastructure.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class CidadeService : ICidadeService
    {
        private readonly ICidadeRepository _repository;
        private readonly IPessoaRepository _pessoaRepository;

        public CidadeService(ICidadeRepository repository, IPessoaRepository pessoaRepository)
        {
            _repository = repository;
            _pessoaRepository = pessoaRepository;
        }

        public void Delete(int id)
        {
            var cidade = new Cidade { Id = id };
            if (_pessoaRepository.FindBy(cidade).Any())
            {
                throw new ApplicationException("Não é possível remover uma Cidade associada a uma pessoa.");
            }

            _repository.Delete(id);
        }

        public IEnumerable<Cidade> FindBy(string nome)
        {
            return _repository.FindBy(nome);
        }

        public Cidade FindBy(int id)
        {
            return _repository.FindBy(id);
        }

        public Paginated<CidadeListagemDto> FindByFiltro(Paginated<CidadeListagemDto> paginated, CidadeListagemDto filtro)
        {
            return _repository.FindByFiltro(paginated, filtro);
        }

        public Cidade Insert(Cidade cidade)
        {
            return _repository.Insert(cidade);
        }

        public void Update(Cidade cidade)
        {
            _repository.Update(cidade);
        }
    }
}
