import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem-pessoa',
  templateUrl: './listagem-pessoa.component.html',
  styleUrls: ['./listagem-pessoa.component.css']
})
export class ListagemPessoaComponent implements OnInit {

  constructor() { 
    console.log("teste coponente");    
  }

  ngOnInit(): void {
  }

}
