using Core.Endities;

namespace Service.IServices
{
    public interface ICidadeService
    {
        Cidade Insert(Cidade cidade);
        IEnumerable<Cidade> FindBy(string nome);
    }
}
