using Core.DTOs;
using Core.Endities;

namespace Infrastructure.IRepositories
{
    public interface ICidadeRepository
    {
        public Cidade Insert(Cidade cidade);
        Paginated<CidadeListagemDto> FindByFiltro(Paginated<CidadeListagemDto> paginated, CidadeListagemDto filtro);
        void Update(Cidade cidade);
        void Delete(int id);
        Cidade FindBy(int id);
        public IEnumerable<Cidade> FindBy(string nome);
    }
}
