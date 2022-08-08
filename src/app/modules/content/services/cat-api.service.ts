import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CatAPIService {
  constructor(private http: HttpClient) {}

  getCats(): Observable<any> {
    return this.http.get<any>(
      'https://api.thecatapi.com/v1/images/search?limit=16&has_breeds=1'
    );
  }

  getCatById(imgId: string): Observable<any> {
    return this.http.get<any>(`https://api.thecatapi.com/v1/images/${imgId}`);
  }

  getUserFavs(userId: string): Observable<any> {
    return this.http.get(
      `https://api.thecatapi.com/v1/favourites?sub_id=${userId}`
    );
  }

  postFavorite(imgId: string, userId: string): Observable<any> {
    return this.http.post<any>(`https://api.thecatapi.com/v1/favourites`, {
      image_id: imgId,
      sub_id: userId,
    });
  }

  deleteFavorite(imgId: number, userId: string): Observable<any> {
    return this.http.delete(
      `https://api.thecatapi.com/v1/favourites/${imgId}?sub_id=${userId}`
    );
  }
}
