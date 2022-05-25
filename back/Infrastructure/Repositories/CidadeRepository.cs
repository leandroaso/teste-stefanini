using Core.Endities;
using Dapper;
using Infrastructure.Dapper;
using Infrastructure.IRepositories;

namespace Infrastructure.Repositories
{
    public class CidadeRepository : ICidadeRepository
    {
        private readonly IDapperConnection _dapper;

        public CidadeRepository(IDapperConnection dapperConnection)
        {
            _dapper = dapperConnection;
        }

        public IEnumerable<Cidade> FindBy(string nome)
        {
            var query = @"
                SELECT
                    ID,
                    NOME,
                    UF
                FROM
                    CIDADE
               ";

            if (!string.IsNullOrWhiteSpace(nome))
                query += " WHERE NOME LIKE @nome ";

            return _dapper.GetConnection()
                .Query<Cidade>(query, new { nome= $"%{nome}%" });
        }

        public Cidade Insert(Cidade cidade)
        {
            var query = @"
                INSERT INTO
                    CIDADE (NOME, UF)
                VALUES
                    (@nome, @uf);
                SELECT CAST(SCOPE_IDENTITY() AS INT)";

            cidade.Id = _dapper.GetConnection().QuerySingle<int>(query, cidade);

            return cidade;
        }
    }
}
