import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService: GifsService) { }

  get history(): string[] {
    return this.gifsService.history;
  }

  ngOnInit(): void {
  }


  searchGifs(query : string) {
    this.gifsService.searchGifs(query);
  }

}
