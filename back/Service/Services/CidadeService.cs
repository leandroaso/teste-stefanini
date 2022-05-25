using Core.Endities;
using Infrastructure.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class CidadeService : ICidadeService
    {
        private readonly ICidadeRepository _repository;

        public CidadeService(ICidadeRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Cidade> FindBy(string nome)
        {
            return _repository.FindBy(nome);
        }

        public Cidade Insert(Cidade cidade)
        {
            return _repository.Insert(cidade);
        }
    }
}
