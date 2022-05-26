import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadesResolver } from 'src/app/core/resolvers/cidades.resolver';
import { PessoaResolver } from 'src/app/core/resolvers/pessoa.resolver';
import { CadastroPessoaComponent } from './cadastro-pessoa.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroPessoaComponent,
    resolve: {
			cidades: CidadesResolver,
      pessoa: PessoaResolver
		},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroPessoaRoutingModule { }
