import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPessoaComponent } from './cadastro-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroPessoaRoutingModule } from './cadastro-pessoa-routing.module';

@NgModule({
  declarations: [CadastroPessoaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CadastroPessoaRoutingModule
  ]
})
export class CadastroPessoaModule { }
