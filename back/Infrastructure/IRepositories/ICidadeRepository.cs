using Core.Endities;

namespace Infrastructure.IRepositories
{
    public interface ICidadeRepository
    {
        public Cidade Insert(Cidade cidade);
        public IEnumerable<Cidade> FindBy(string nome);
    }
}
