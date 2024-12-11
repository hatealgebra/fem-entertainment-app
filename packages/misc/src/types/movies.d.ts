export interface IMovie
  extends Pick<
    IMovieBackend,
    | "_id"
    | "adult"
    | "budget"
    | "genres"
    | "id"
    | "overview"
    | "popularity"
    | "revenue"
    | "runtime"
    | "status"
    | "tagline"
    | "title"
    | "video"
  > {
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  backdropPath: string;
  posterPath: string;
  productionCompanies: IProductionCompany[];
  productionCountries: IProductionCountry[];
  releaseDate: string;
  spokenLanguages: ISpokenLanguage[];
  voteAverage: number;
  voteCount: number;
}

export interface IMovieBackend {
  _id: string;
  adult: boolean;
  budget: number;
  genres: string[];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  keywords: string[];
}

export interface IProductionCompany {
  id: number;
  name: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  iso_639_1: string;
  name: string;
}
