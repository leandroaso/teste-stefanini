import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pessoa } from '../entities/pessoa';

@Injectable({
    providedIn: 'root'
  })
export class PessoaResolver implements Resolve<Observable<Pessoa>> {
    private url = environment.API_URL + 'pessoa';
	constructor(
        private http: HttpClient
    ) {}

	resolve(route: ActivatedRouteSnapshot) {		
        const idPessoa = route.queryParamMap.get('id'); 
        if(idPessoa){
            const params = new HttpParams().append('id', idPessoa);
            return this.http.get<Pessoa>(this.url, {params});
        }       
	}
}
