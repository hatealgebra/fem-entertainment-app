export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  refreshTokens: Array<string>;
  bookmarkedMovies: Array<string>;
}
