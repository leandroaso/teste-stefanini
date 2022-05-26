import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cidade } from '../entities/cidade';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CidadeResolver implements Resolve<Observable<Cidade>> {
    private url = environment.API_URL + 'cidade/';
    constructor(
        private http: HttpClient
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const idPessoa = route.queryParamMap.get('id');
        if (idPessoa) {
            const params = new HttpParams().append('id', idPessoa);
            return this.http.get<Cidade>(this.url + 'by-id', { params });
        }
    }
}
