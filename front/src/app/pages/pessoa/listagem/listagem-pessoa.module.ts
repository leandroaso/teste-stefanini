import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemPessoaComponent } from './listagem-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemPessoaRoutingModule } from './listagem-pessoa-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [ListagemPessoaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ListagemPessoaRoutingModule,
    InputTextModule,
    ButtonModule
  ]
})
export class ListagemPessoaModule { }
