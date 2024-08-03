export interface IMovie {
  title: string;
  thumbnail: IThumbnail;
  year: number;
  category: ECategory;
  rating: ERating;
  isBookmarked: boolean;
  isTrending: boolean;
}
export interface IThumbnail {
  trending?: ITrending | null;
  regular: IRegular;
}
export interface ITrending {
  small: string;
  large: string;
}
export interface IRegular {
  small: string;
  medium: string;
  large: string;
}

export enum ERating {
  PG = "PG",
  E = "E",
  EIGHTEEN_PLUS = "18+",
  N_A = "N/A",
}
export enum ECategory {
  MOVIE = "Movie",
  TV_SERIES = "TV Series",
  N_A = "N/A",
}
