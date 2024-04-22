"use client";

import { ReactNode, useReducer } from "react";
import {
  AppContext,
  AppDispatchContext,
  initialContextValue,
} from "./AppContext";
import appReducer from "./appReducer";

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialContextValue);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default ContextProvider;
