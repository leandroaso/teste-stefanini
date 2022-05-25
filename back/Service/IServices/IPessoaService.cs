using Core.DTOs;
using Core.Endities;

namespace Service.IServices
{
    public interface IPessoaService
    {
        Pessoa Insert(Pessoa pessoa);
        Pessoa GetBy(int id);
        void Update(Pessoa pessoa);
        Paginated<PessoaListagemDto> FindByFiltro(Paginated<PessoaListagemDto> paginated, FiltroPaginated filtro);
    }
}
