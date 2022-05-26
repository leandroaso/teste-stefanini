import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCidadeComponent } from './listagem-cidade.component';

const routes: Routes = [
  {
    path: '',
    component: ListagemCidadeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemCidadeRoutingModule { }
