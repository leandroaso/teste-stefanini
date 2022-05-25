using FluentMigrator;

namespace Migrations
{
    [Migration(1L, "Criação das tabelas PESSOA e CIDADE")]
    public class Migration001 : Migration
    {
        public override void Up()
        {
            CriarTabelaCidade();
            CriarTabelaPessoa();
        }

        private void CriarTabelaCidade()
        {
            const string TABELA = "CIDADE";

            if (Schema.Table(TABELA).Exists())
                return;

            Create.Table(TABELA)
                .WithColumn("ID").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("NOME").AsAnsiString(200).NotNullable()
                .WithColumn("UF").AsAnsiString(2).NotNullable()
                .WithColumn("DATA_CRIACAO").AsDateTime().WithDefault(SystemMethods.CurrentDateTime).NotNullable();
        }

        private void CriarTabelaPessoa()
        {
            const string TABELA = "PESSOA";

            if (Schema.Table(TABELA).Exists())
                return;

            Create.Table(TABELA)
                .WithColumn("ID").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("NOME").AsAnsiString(300).NotNullable()
                .WithColumn("CPF").AsAnsiString(11).NotNullable()
                .WithColumn("ID_CIDADE").AsInt32().NotNullable().ForeignKey("CIDADE", "ID")
                .WithColumn("IDADE").AsInt32()
                .WithColumn("DATA_CRIACAO").AsDateTime().WithDefault(SystemMethods.CurrentDateTime).NotNullable();
        }

        public override void Down()
        {
        }
    }
}
