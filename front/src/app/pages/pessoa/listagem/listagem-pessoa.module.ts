import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemPessoaComponent } from './listagem-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemPessoaRoutingModule } from './listagem-pessoa-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {KeyFilterModule} from 'primeng/keyfilter';

@NgModule({
  declarations: [ListagemPessoaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ListagemPessoaRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule,
    DropdownModule,
    KeyFilterModule
  ]
})
export class ListagemPessoaModule { }
