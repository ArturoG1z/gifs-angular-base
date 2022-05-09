import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  get results(): Gif[] {
    return this.gifsService.results;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }
  
}
