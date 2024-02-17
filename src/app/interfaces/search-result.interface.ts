import { UnsplashImages } from './img.interfaces';

export interface SearchResult {
  total: number;
  total_pages: number;
  results: UnsplashImages[];
}
