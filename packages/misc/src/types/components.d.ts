import { IMovie } from "./movies";

export interface IMediaDetailUI extends IMovie {
  Id: string;
  isTouch?: boolean;
  isBookmarked?: boolean;
  handleBookmark: (movieId: string, isBookmarked: boolean) => Promise<Response>;
}
