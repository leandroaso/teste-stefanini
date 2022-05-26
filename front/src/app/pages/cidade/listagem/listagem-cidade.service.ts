import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paginated } from 'src/app/core/dtos/paginated';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/core/entities/cidade';

@Injectable({
  providedIn: 'root'
})
export class ListagemCidadeService {
  private url = environment.API_URL + 'cidade';

  constructor(
    private http: HttpClient
  ) { }

  public geCidadesFiltro(
    paginated: Paginated<Cidade>,
    filtro: Cidade
  ): Observable<Paginated<Cidade>> {
    let params = new HttpParams()
      .append('pageNumber', paginated.pageNumber.toString())
      .append('pageSize', paginated.pageSize.toString());

      if(filtro.nome){
        params = params.append('filtro.nome', filtro.nome);
      }
      if(filtro.uf){
        params = params.append('filtro.uf', filtro.uf);
      }    
    
    return this.http.get<Paginated<Cidade>>(
      this.url + '/paginated',
      {
        params,
      }
    );
  }

  public delete(cidade: Cidade): Observable<any>{
    let params = new HttpParams()
      .append('id', cidade.id.toString());

    return this.http.delete(this.url, {params});
  }
}
