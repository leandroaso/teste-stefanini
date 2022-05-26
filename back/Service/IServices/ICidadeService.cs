using Core.DTOs;
using Core.Endities;

namespace Service.IServices
{
    public interface ICidadeService
    {
        Cidade Insert(Cidade cidade);
        Paginated<CidadeListagemDto> FindByFiltro(Paginated<CidadeListagemDto> paginated, CidadeListagemDto filtro);
        void Update(Cidade cidade);
        void Delete(int id);
        IEnumerable<Cidade> FindBy(string nome);
        Cidade FindBy(int id);
    }
}
