import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pessoa } from 'src/app/core/entities/pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroPessoaService {
  private url = environment.API_URL + 'pessoa';

  constructor(
    private http: HttpClient
  ) { }

  public salver(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.url, pessoa);
  }

  public update(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.url, pessoa);
  }
}
