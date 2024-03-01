import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UnsplashImages } from '../interfaces/img.interfaces';
import { SearchResult } from '../interfaces/search-result.interface';
import { FilterState } from '../store/reducers/filters.redicer';
import { ImageStatcis } from '../interfaces/img-statics.interface';
import { ImageByID } from '../interfaces/imgByID.interface';

//export type LastTypeLoaded = 'Default' | 'Search';

@Injectable({
  providedIn: 'root',
})
export class ImgService {
  private defaultPhotoURL = 'https://api.unsplash.com/photos/';
  private searchPhotoURL = 'https://api.unsplash.com/search/photos/';

  constructor(private http: HttpClient) {}

  getImages(page?: number): Observable<UnsplashImages[]> {
    return this.http.get<UnsplashImages[]>(this.defaultPhotoURL, {
      params: {
        per_page: 15,
        page: page || 1,
      },
    });
  }

  seachImg(filter: FilterState): Observable<UnsplashImages[]> {
    return this.http
      .get<SearchResult>(this.searchPhotoURL, {
        params: {
          ...filter,
          per_page: filter?.per_page || 15,
          page: filter?.page || 1,
        },
      })
      .pipe(map((resp) => resp.results));
  }

  seachImgByID(id: string): Observable<ImageByID> {
    return this.http.get<ImageByID>(`${this.defaultPhotoURL}${id}`);
  }

  seachImgStaticsByID(id: string): Observable<ImageStatcis> {
    return this.http.get<ImageStatcis>(
      `${this.defaultPhotoURL}${id}/statistics`
    );
  }
}
