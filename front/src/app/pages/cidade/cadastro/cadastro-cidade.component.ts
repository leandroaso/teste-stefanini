import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Data, ActivatedRoute, Router } from '@angular/router';
import { CadastroCidadeService } from './cadastro-cidade.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cadastro-cidade.component.html',
  styleUrls: ['./cadastro-cidade.component.css']
})
export class CadastroCidadeComponent implements OnInit {
  public formulario: FormGroup;
  public modoEdicao: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: CadastroCidadeService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.criarFormualrio();
    this.carregarDadosEdicao();
  }

  private carregarDadosEdicao(): void {
    const data: Data = this.route.snapshot.data;
    
    if (data.cidade) {
      this.modoEdicao = true;
      this.formulario.patchValue(data.cidade);
    }
  }

  private criarFormualrio(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      uf: [null, Validators.required]
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
      this.service.update(this.formulario.value).subscribe((cidade) => {
        this.router.navigate(['cidade']);
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Dados atualizado com sucesso!'});
      });
      return;
    }

    this.service.salver(this.formulario.value).subscribe((cidade) => {
      this.router.navigate(['cidade']);
      this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Dados cadastrados com sucesso!'});
    });
  }

  public cancelar(): void {
    this.router.navigate(['cidade']);
  }

  public campoEhValido(campo: string, error: string): boolean {
    const { touched, errors } = this.formulario.controls[campo];
    
    var validar = null;
    if(errors){
      validar = errors[error];
    }    
    return !(touched && validar);
  }
}
