import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
        path: 'pessoa',
        loadChildren: () => import('./pages/pessoa/listagem/listagem-pessoa.module')
            .then((m) => m.ListagemPessoaModule)
    },
    {
        path: 'cadastro-pessoa',
        loadChildren: () => import('./pages/pessoa/cadastro/cadastro-pessoa.module')
            .then((m) => m.CadastroPessoaModule)
    },
    {
        path: '**',
        redirectTo: 'pessoa',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
