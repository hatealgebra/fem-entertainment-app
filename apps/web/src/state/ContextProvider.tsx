"use client";

import { ReactNode, useReducer } from "react";
import {
  AppContext,
  AppDispatchContext,
  initialContextValue,
} from "./AppContext";
import appReducer from "./appReducer";
import { Middleware, SWRConfig, SWRHook } from "swr";
import { snakeCaseToCamelCase } from "../utils";

const swrMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);

    if (!swr.data?.data) {
      return swr;
    }

    const dataArray = swr.data.data;
    const transformedKeys = Object.values(dataArray).map((data) =>
      snakeCaseToCamelCase(data)
    );

    const updatedSWR = { ...swr, data: { ...swr.data, data: transformedKeys } };
    return updatedSWR;
  };

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialContextValue);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <SWRConfig
          value={{
            use: [swrMiddleware],
            errorRetryInterval: 600000,
          }}
        >
          {children}
        </SWRConfig>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default ContextProvider;
