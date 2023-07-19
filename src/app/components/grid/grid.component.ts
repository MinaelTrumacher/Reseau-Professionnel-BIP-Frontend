import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  tiles: Tile[] = [
    {text: 'CV et Epxériences', cols: 1, rows: 8, color: 'lightblue'},
    {text: 'Quoi de neuf ?', cols: 2, rows: 2, color: 'lightgreen'},
    {text: 'Fil Actualité', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Fil Actualité', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Fil Actualité', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Fil Actualité', cols: 3, rows: 3, color: 'lightpink'},
    {text: 'Fil Actualité', cols: 3, rows: 3, color: 'lightblue'},
    {text: 'Fil Actualité', cols: 3, rows: 3, color: 'lightpink'},
    {text: 'Fil Actualité', cols: 3, rows: 3, color: 'lightblue'},
    {text: 'Fil Actualité', cols: 3, rows: 3, color: 'lightpink'},
    {text: 'Fil Actualité', cols: 3, rows: 3, color: 'lightblue'},


  ];

}
