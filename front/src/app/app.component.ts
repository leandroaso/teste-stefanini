import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stefanini';
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Pessoa',
        routerLink: "pessoa"
      },
      {
        label: 'Cidade',        
        routerLink: "cidade"
      }
    ];
  }
}
