import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ListagemPessoaDto } from 'src/app/core/dtos/listagem-pessoa.dto';
import { Paginated } from 'src/app/core/dtos/paginated';
import { Observable } from 'rxjs';
import { FiltroListagemPessoaDto } from 'src/app/core/dtos/filtro-listagem-pessoa.dto';
import { Pessoa } from '../../../core/entities/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ListagemPessoaService {
  private url = environment.API_URL + 'pessoa';

  constructor(
    private http: HttpClient
  ) { }

  public gePessoasFiltro(
    paginated: Paginated<ListagemPessoaDto>,
    filtro: FiltroListagemPessoaDto
  ): Observable<Paginated<ListagemPessoaDto>> {
    let params = new HttpParams()
      .append('pageNumber', paginated.pageNumber.toString())
      .append('pageSize', paginated.pageSize.toString());

      if(filtro.nome){
        params = params.append('filtro.nome', filtro.nome);
      }
      if(filtro.cpf){
        params = params.append('filtro.cpf', filtro.cpf);
      }
      if(filtro.idade){
        params = params.append('filtro.idade', filtro.idade.toString());
      }
      if(filtro.cidade){
        params = params.append('filtro.cidadeId', filtro.cidade.toString());
      }
    
    return this.http.get<Paginated<ListagemPessoaDto>>(
      this.url + '/paginated',
      {
        params,
      }
    );
  }

  public delete(pessoa: Pessoa): Observable<any>{
    let params = new HttpParams()
      .append('id', pessoa.id.toString());

    return this.http.delete(this.url, {params});
  }
}
