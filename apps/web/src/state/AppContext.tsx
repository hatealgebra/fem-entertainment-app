import { createContext } from "react";

export interface IAppContext {
  user?: null | {
    name: string;
    email: string;
  };
  searchString: null | string;
}

export const initialContextValue: IAppContext = {
  user: null,
  searchString: null,
};

export const AppContext = createContext<IAppContext>(initialContextValue);
export const AppDispatchContext = createContext<{} | null>(null);
