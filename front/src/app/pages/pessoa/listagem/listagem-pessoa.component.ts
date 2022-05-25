import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { ListagemPessoaDto } from 'src/app/core/dtos/listagem-pessoa.dto';
import { Paginated } from 'src/app/core/dtos/paginated';
import { ListagemPessoaService } from './listagem-pessoa.service';
import { Cidade } from '../../../core/entities/cidade';


@Component({
  selector: 'app-listagem-pessoa',
  templateUrl: './listagem-pessoa.component.html',
  styleUrls: ['./listagem-pessoa.component.css']
})
export class ListagemPessoaComponent implements OnInit {
  public formulario: FormGroup;
  public paginated = new Paginated<ListagemPessoaDto>();
  public cidades: SelectItem[];
  public cols: any;

  constructor(
    private service: ListagemPessoaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.constuirColunas();
  }

  ngOnInit(): void {
    this.carregarListaCidades();
    this.criarFormualrio();
  }

  private criarFormualrio(): void{
    this.formulario = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      idade: [null],
      cidade: [null],
    });
  }

  public paginacaoAtual(): string {
    const pageNumber = this.paginated.pageNumber;
    if (this.paginated.content != null) {
      const inicio = pageNumber * this.paginated.pageSize + 1;
      const fim =
        pageNumber * this.paginated.pageSize + this.paginated.content.length;
      const total = this.paginated.count;
      return `${inicio} a ${fim} de ${total}`;
    }
    return '';
  }

  public pesquisarPorFiltro(): void {
    const filtro = this.formulario.getRawValue();

    this.service.gePessoasFiltro(this.paginated, filtro).subscribe((paginate) => {
      this.paginated = paginate;
    });
  }


  public paginate(event: LazyLoadEvent): void {
    this.paginated.pageNumber = event.first / event.rows;

    this.pesquisarPorFiltro();
  }

  private carregarListaCidades(): void {
    const data: Data = this.route.snapshot.data;

    if (data.cidades) {
      this.cidades = data.cidades.map((cidade: Cidade) => {
        return { label: cidade.nome, value: cidade.id }
      });
    }
  }


  private constuirColunas(): void {
    this.cols = [
      {
        field: 'nome',
        header: 'NOME',
      },
      {
        field: 'cpf',
        header: 'CPF',
      },
      {
        field: 'idade',
        header: 'IDADE',
      },
      {
        field: 'cidade',
        header: 'CIDADE',
      },
      {
        field: '',
        header: 'AÇÕES',
      },
    ];
  }
}
