using Core.DTOs;
using Core.Endities;
using Core.Utils;
using Infrastructure.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _repository;
        public PessoaService(IPessoaRepository repository)
        {
            _repository = repository;
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        public Paginated<PessoaListagemDto> FindByFiltro(Paginated<PessoaListagemDto> paginated, FiltroPaginated filtro)
        {
            return _repository.GetByFiltro(paginated, filtro);
        }

        public Pessoa GetBy(int id)
        {
            return _repository.GetBy(id);
        }

        public Pessoa Insert(Pessoa pessoa)
        {
            validarCpf(pessoa.Cpf);

            return _repository.Insert(pessoa);
        }

        public void Update(Pessoa pessoa)
        {
            validarCpf(pessoa.Cpf);

            _repository.Update(pessoa);
        }

        private void validarCpf(string cpf)
        {
            if (!CpfUtil.IsCpf(cpf))
            {
                throw new ApplicationException("CPF invalido");
            }
        }
    }
}
