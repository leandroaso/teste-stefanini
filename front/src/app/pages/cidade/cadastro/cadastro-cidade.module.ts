import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroCidadeComponent } from './cadastro-cidade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroCidadeRoutingModule } from './cadastro-cidade-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [CadastroCidadeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CadastroCidadeRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule
  ]
})
export class CadastroCidadeModule { }
