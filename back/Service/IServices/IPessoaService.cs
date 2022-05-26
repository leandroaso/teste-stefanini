using Core.DTOs;
using Core.Endities;

namespace Service.IServices
{
    public interface IPessoaService
    {
        Pessoa Insert(Pessoa pessoa);
        Pessoa GetBy(int id);
        void Update(Pessoa pessoa);
        void Delete(int id);
        Paginated<PessoaListagemDto> FindByFiltro(Paginated<PessoaListagemDto> paginated, FiltroPaginated filtro);
    }
}
