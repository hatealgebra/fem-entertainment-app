import { IMovie } from "./movies";

export interface IMediaDetailUI extends IMovie {
  isTouch?: boolean;
  isBookmarked?: boolean;
  handleBookmark?: (
    movieId: number,
    isBookmarked: boolean
  ) => Promise<Response>;
}
