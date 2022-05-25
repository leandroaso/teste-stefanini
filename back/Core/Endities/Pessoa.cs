using System.ComponentModel.DataAnnotations;

namespace Core.Endities
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [StringLength(maximumLength: 300)]
        public string Nome { get; set; }

        [Required]
        [StringLength(maximumLength: 11, MinimumLength = 11)]
        public string Cpf { get; set; }

        [Required]
        public int Idade { get; set; }

        [Required]
        public Cidade Cidade { get; set; }
    }
}
