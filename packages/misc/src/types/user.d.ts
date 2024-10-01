export interface IUser<T> {
  name: string;
  email: string;
  password: string;
  avatar: string;
  refreshTokens: Array<string>;
  bookmarkedMovies: DocumentArray;
}
