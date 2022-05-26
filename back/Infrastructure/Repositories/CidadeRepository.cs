using Core.DTOs;
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
                .Query<Cidade>(query, new { nome = $"%{nome}%" });
        }

        public Paginated<CidadeListagemDto> FindByFiltro(Paginated<CidadeListagemDto> paginated, CidadeListagemDto filtro)
        {
            var queryWhere = ConstruirSqlWhere(filtro);

            var query = @"
                SELECT
                    COUNT(ID)
                FROM 
                    CIDADE  ";

            query += queryWhere;

            query += @"
                SELECT
                    ID,
                    NOME,
                    UF
                FROM
                    CIDADE ";

            query += queryWhere;

            query += $@"ORDER by ID  OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY; ";

            using (var multi = _dapper.GetConnection().QueryMultiple(query, new
            {
                nome = filtro.Nome,
                uf = filtro.Uf,
                offset = paginated.GetOffSet(),
                pageSize = paginated.PageSize
            }))
            {
                paginated.Count = multi.Read<int>().First();
                paginated.Content = multi.Read<CidadeListagemDto>().ToList();
            }

            return paginated;
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

        public void Update(Cidade cidade)
        {
            var sql = @"
                UPDATE
	                CIDADE
                SET
	                NOME = @nome,
	                UF = @uf
                WHERE
	                ID = @id ";

            _dapper.GetConnection().Execute(sql, cidade);
        }

        public void Delete(int id)
        {
            var sql = @"
                DELETE FROM
	                CIDADE
                WHERE
	                ID = @id ";

            _dapper.GetConnection().Execute(sql, new
            {
                id
            });
        }

        private string ConstruirSqlWhere(CidadeListagemDto filtro)
        {
            var sql = string.Empty;

            if (!string.IsNullOrWhiteSpace(filtro.Nome))
                sql += " NOME = @nome ";

            if (!string.IsNullOrWhiteSpace(filtro.Uf))
                sql += $"{addEndClosure(sql)} UF = @uf ";

            if (!string.IsNullOrWhiteSpace(sql))
                sql = $" WHERE {sql}";

            return sql;
        }

        private string addEndClosure(string sql)
        {
            if (string.IsNullOrWhiteSpace(sql))
                return string.Empty;

            return " AND ";
        }

        public Cidade FindBy(int id)
        {
            var query = @"
                SELECT
                    ID,
                    NOME,
                    UF
                FROM
                    CIDADE
                WHERE ID = @id ";

            return _dapper.GetConnection()
                .QueryFirstOrDefault<Cidade>(query, new { id });
        }
    }
}
