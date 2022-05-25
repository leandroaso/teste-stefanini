import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPessoaComponent } from './listagem-pessoa.component';

const routes: Routes = [
  {
    path: '',
    component: ListagemPessoaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemPessoaRoutingModule { }
