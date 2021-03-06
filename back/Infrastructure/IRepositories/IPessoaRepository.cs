using Core.DTOs;
using Core.Endities;

namespace Infrastructure.IRepositories
{
    public interface IPessoaRepository
    {
        public Pessoa Insert(Pessoa pessoa);
        Pessoa GetBy(int id);
        public IEnumerable<Pessoa> FindBy(Cidade cidade);
        public void Update(Pessoa pessoa);
        public void Delete(int id);
        public Paginated<PessoaListagemDto> GetByFiltro(Paginated<PessoaListagemDto> paginated, FiltroPaginated filtro);
    }
}
