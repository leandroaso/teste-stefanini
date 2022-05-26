import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cidade } from 'src/app/core/entities/cidade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroCidadeService {
  private url = environment.API_URL + 'cidade';

  constructor(
    private http: HttpClient
  ) { }

  public salver(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.url, cidade);
  }

  public update(cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(this.url, cidade);
  }
}
