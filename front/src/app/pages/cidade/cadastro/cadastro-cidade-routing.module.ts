import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadeResolver } from 'src/app/core/resolvers/cidade.resolver';
import { CadastroCidadeComponent } from './cadastro-cidade.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroCidadeComponent,
    resolve: {
      cidade: CidadeResolver
		},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroCidadeRoutingModule { }
