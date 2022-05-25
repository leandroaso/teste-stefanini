import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadesResolver } from 'src/app/core/resolvers/cidades.resolver';
import { ListagemPessoaComponent } from './listagem-pessoa.component';

const routes: Routes = [
  {
    path: '',
    component: ListagemPessoaComponent,
    resolve: {
			cidades: CidadesResolver,
		},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemPessoaRoutingModule { }
