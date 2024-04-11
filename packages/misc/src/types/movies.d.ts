export interface IMovie {
  title: string;
  thumbnail: IThumbnail;
  year: number;
  category: string;
  rating: string;
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
