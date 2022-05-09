import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'kKuFUTl6Fn7LcMkCDq8XmPWTDYNVDeTX';
  private _history: string[] = [];
  public results: Gif[] = [];
  private lastQuery: string = '';
  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history') ?? '[]');
    this.results = JSON.parse(localStorage.getItem('results') ?? '[]');
  }

  get history(): string[] {
    return [...this._history];
  }

  searchGifs(query: string): void {
    query = query.trim().toLowerCase();
    if (!query) return;
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.slice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }
    if (query === this.lastQuery) return;
    this.lastQuery = query;
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((res: SearchGifsResponse) => {
        console.log(res);
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
