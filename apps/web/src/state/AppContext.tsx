import { createContext } from "react";
import { bookmarkMovie } from "../services/client/user.services";

export interface IAppContext {
  user?: null | {
    id: string;
    name: string;
    email: string;
    bookmarkdedMovies: string[];
  };
  searchString: null | string;
  actions: {
    bookmarkMovie: (movieId: number) => Promise<Response>;
  };
}

export const initialContextValue: IAppContext = {
  user: null,
  searchString: null,
  actions: {
    bookmarkMovie,
  },
};

export const AppContext = createContext<IAppContext>(initialContextValue);
export const AppDispatchContext = createContext<{} | null>(null);
