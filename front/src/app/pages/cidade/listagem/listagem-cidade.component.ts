import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Paginated } from 'src/app/core/dtos/paginated';
import { Cidade } from 'src/app/core/entities/cidade';
import { ListagemCidadeService } from './listagem-cidade.service';

@Component({
  selector: 'app-listagem-cidade',
  templateUrl: './listagem-cidade.component.html',
  styleUrls: ['./listagem-cidade.component.css']
})
export class ListagemCidadeComponent implements OnInit {
  public formulario: FormGroup;
  public paginated = new Paginated<Cidade>();
  public cols: any;

  constructor(
    private service: ListagemCidadeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.constuirColunas();
  }

  ngOnInit(): void {
    this.criarFormualrio();
  }

  private criarFormualrio(): void{
    this.formulario = this.formBuilder.group({
      nome: [null],
      uf: [null]
    });
  }

  public adicionarCidade(): void{
    this.router.navigate(['cadastro-cidade']);
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

    this.service.geCidadesFiltro(this.paginated, filtro).subscribe((paginate) => {
      this.paginated = paginate;
    });
  }

  public paginate(event: LazyLoadEvent): void {
    this.paginated.pageNumber = event.first / event.rows;

    this.pesquisarPorFiltro();
  }
  
  public editar(cidade: Cidade): void {    
		this.router.navigate(['cadastro-cidade'], {
			queryParams: { id: cidade.id },
		});
	}

  public remover(cidade: Cidade): void {    
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja remover esse cadastro?',
        header: 'Confirmação',
        acceptLabel: 'SIM',
        rejectLabel: 'NÃO',
        accept: () => {
            this.service.delete(cidade).subscribe((dados)=>{
              this.pesquisarPorFiltro();
            },(error)=>{
              this.messageService.add({severity:'error', summary:'Error!', detail:error['error']});
            });
        }
    });
	}

  private constuirColunas(): void {
    this.cols = [
      {
        field: 'nome',
        header: 'NOME',
      },
      {
        field: 'uf',
        header: 'UF',
      },
      {
        field: '',
        header: 'AÇÕES',
      },
    ];
  }
}
