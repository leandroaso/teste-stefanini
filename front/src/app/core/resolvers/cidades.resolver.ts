import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cidade } from '../entities/cidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class CidadesResolver implements Resolve<Observable<Array<Cidade>>> {
    private url = environment.API_URL + 'cidade';
	constructor(
        private http: HttpClient
    ) {}

	resolve() {		 
        return this.http.get<Array<Cidade>>(this.url);
	}
}
