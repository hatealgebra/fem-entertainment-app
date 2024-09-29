import { IMovie } from "./movies";

export interface IMediaDetailUI extends IMovie {
  _id: string;
  isTouch?: boolean;
  isBookmarked?: boolean;
  handleBookmark: (movieId: string, isBookmarked: boolean) => Promise<void>;
}
