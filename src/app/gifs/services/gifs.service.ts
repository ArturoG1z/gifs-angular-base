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
  constructor(private http: HttpClient) {}

  get history(): string[] {
    return [...this._history];
  }

  searchGifs(query: string): void {
    query = query.trim().toLowerCase();
    if (!query) return;
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.slice(0, 10);
      this.http
        .get<SearchGifsResponse>(
          `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
        )
        .subscribe((res: SearchGifsResponse) => {
          console.log(res);
          this.results = res.data;
        });
    }
  }
}
