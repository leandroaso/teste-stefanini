import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Data, ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/core/entities/cidade';
import { CadastroPessoaService } from './cadastro-pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  public formulario: FormGroup;
  public cidades: SelectItem[];
  public modoEdicao: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: CadastroPessoaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.carregarListaCidades();
    this.criarFormualrio();
    this.carregarDadosEdicao();
  }

  private carregarListaCidades(): void {
    const data: Data = this.route.snapshot.data;

    if (data.cidades) {
      this.cidades = data.cidades.map((cidade: Cidade) => {
        return { label: cidade.nome, value: cidade }
      });
    }
  }
  private carregarDadosEdicao(): void {
    const data: Data = this.route.snapshot.data;

    if (data.pessoa) {
      this.modoEdicao = true;
      this.formulario.patchValue(data.pessoa);
    }
  }

  private criarFormualrio(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      idade: [null, Validators.required],
      cidade: [null, Validators.required],
    });
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key).markAsDirty();
        this.formulario.get(key).markAsTouched();
      });
      return;
    }

    if (this.modoEdicao) {
      this.service.update(this.formulario.value).subscribe((pessoa) => {
        this.router.navigate(['pessoa']);
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Dados atualizado com sucesso!' });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: error['error'] });
      });
      return;
    }

    this.service.salver(this.formulario.value).subscribe((pessoa) => {
      this.router.navigate(['pessoa']);
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Dados cadastrados com sucesso!' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error!', detail: error['error'] });
    });
  }

  public cancelar(): void {
    this.router.navigate(['pessoa']);
  }

  public campoEhObrigatorio(campo: string): boolean {
    const { touched, errors } = this.formulario.controls[campo];

    return !(touched && errors);
  }
}
