import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(public elementRef:ElementRef) { }

  ngOnInit(): void {
  }

}
