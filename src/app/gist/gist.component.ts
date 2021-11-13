import { Component, Input, OnInit } from '@angular/core';
import { Gist } from '../gist';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.css']
})
export class GistComponent implements OnInit {

  @Input() gist: Gist = new Gist();
  @Input() index: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

}
