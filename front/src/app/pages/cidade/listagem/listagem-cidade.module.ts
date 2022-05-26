import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemCidadeComponent } from './listagem-cidade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemCidadeRoutingModule } from './listagem-cidade-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [ListagemCidadeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ListagemCidadeRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule
  ]
})
export class ListagemCidadeModule { }
