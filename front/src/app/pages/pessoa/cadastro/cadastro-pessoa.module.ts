import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPessoaComponent } from './cadastro-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroPessoaRoutingModule } from './cadastro-pessoa-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import {KeyFilterModule} from 'primeng/keyfilter';

@NgModule({
  declarations: [CadastroPessoaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CadastroPessoaRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule,
    DropdownModule,
    KeyFilterModule
  ]
})
export class CadastroPessoaModule { }
