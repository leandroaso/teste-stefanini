using Core.DTOs;
using Core.Endities;
using Dapper;
using Infrastructure.Dapper;
using Infrastructure.IRepositories;

namespace Infrastructure.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly IDapperConnection _dapper;

        public PessoaRepository(IDapperConnection dapperConnection)
        {
            _dapper = dapperConnection;
        }

        public Paginated<PessoaListagemDto> GetByFiltro(Paginated<PessoaListagemDto> paginated, FiltroPaginated filtro)
        {
            var queryWhere = ConstruirSqlWhere(filtro);

            var query = @"
                SELECT
                    COUNT(P.ID)
                FROM 
                    PESSOA P
                    INNER JOIN CIDADE C ON P.ID_CIDADE = C.ID ";

            query += queryWhere;

            query += @"
                SELECT
                    P.ID,
                    P.NOME,
                    P.CPF,
                    P.IDADE,
                    C.NOME CIDADE
                FROM
                    PESSOA P
                    INNER JOIN CIDADE C ON P.ID_CIDADE = C.ID ";

            query += queryWhere;

            query += $@"ORDER by P.ID  OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY; ";

            using (var multi = _dapper.GetConnection().QueryMultiple(query, new
            {
                nome = filtro.Nome,
                cpf = filtro.Cpf,
                idade = filtro.Idade,
                cidadeId = filtro.CidadeId,
                offset = paginated.GetOffSet(),
                pageSize = paginated.PageSize
            }))
            {
                paginated.Count = multi.Read<int>().First();
                paginated.Content = multi.Read<PessoaListagemDto>().ToList();
            }

            return paginated;
        }

        public Pessoa Insert(Pessoa pessoa)
        {
            var query = @"
                INSERT INTO
                    PESSOA (NOME, CPF, IDADE, ID_CIDADE)
                VALUES
                    (@nome, @cpf, @idade, @cidadeId);
                SELECT CAST(SCOPE_IDENTITY() AS INT)";

            pessoa.Id = _dapper.GetConnection().QuerySingle<int>(query, new
            {
                nome = pessoa.Nome,
                cpf = pessoa.Cpf,
                idade = pessoa.Idade,
                cidadeId = pessoa.Cidade.Id
            });

            return pessoa;
        }

        public Pessoa GetBy(int id)
        {
            var query = @"
                 SELECT
                    P.ID,
                    P.NOME,
                    P.CPF,
                    P.IDADE,
                    C.ID,
                    C.NOME,
                    C.UF
                FROM
                    PESSOA P
                    INNER JOIN CIDADE C ON P.ID_CIDADE = C.ID 
                WHERE P.ID = @id";

            var pessoa = _dapper.GetConnection().Query(query, (System.Func<Pessoa, Cidade, Pessoa>)(
                            (pessoa, cidade) =>
                            {
                                pessoa.Cidade = cidade;

                                return pessoa;
                            }), param: new { id }).FirstOrDefault();
            return pessoa;
        }

        public void Update(Pessoa pessoa)
        {
            var sql = @"
                UPDATE
	                PESSOA
                SET
	                NOME = @nome,
	                CPF = @cpf,
	                ID_CIDADE = @cidadeId,
	                IDADE = @idade
                WHERE
	                ID = @id ";

            _dapper.GetConnection().Execute(sql, new
            {
                id = pessoa.Id,
                nome = pessoa.Nome,
                cpf = pessoa.Cpf,
                idade = pessoa.Idade,
                cidadeId = pessoa.Cidade.Id
            });
        }

        public void Delete(int id)
        {
            var sql = @"
                DELETE FROM
	                PESSOA
                WHERE
	                ID = @id ";

            _dapper.GetConnection().Execute(sql, new
            {
                id
            });
        }

        private string ConstruirSqlWhere(FiltroPaginated filtro)
        {
            var sql = string.Empty;

            if (!string.IsNullOrWhiteSpace(filtro.Nome))
                sql += " P.NOME = @nome ";

            if (!string.IsNullOrWhiteSpace(filtro.Cpf))
                sql += $"{addEndClosure(sql)} P.CPF = @cpf ";

            if (filtro.CidadeId > 0)
                sql += $"{addEndClosure(sql)} C.ID = @cidadeId ";

            if (filtro.Idade > 0)
                sql += $"{addEndClosure(sql)} P.IDADE = @idade ";

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

 
    }
}
