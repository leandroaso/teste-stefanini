using System.ComponentModel.DataAnnotations;

namespace Core.Endities
{
    public class Cidade
    {
        public int? Id { get; set; }
        [Required]
        [StringLength(maximumLength:200)]
        public string Nome { get; set; }
        [Required]
        [StringLength(maximumLength: 2, MinimumLength=2)]
        public string Uf { get; set; }
    }
}
