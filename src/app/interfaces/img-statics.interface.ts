export interface ImageStatcis {
  id: string;
  slug: string;
  downloads: Downloads;
  views: Downloads;
  likes: Downloads;
}

export interface Downloads {
  total: number;
  historical: Historical;
}

export interface Historical {
  change: number;
  resolution: string;
  quantity: number;
  values: Value[];
}

export interface Value {
  date: Date;
  value: number;
}
