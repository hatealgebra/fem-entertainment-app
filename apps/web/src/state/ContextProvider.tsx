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
// Rewrite

const transformKeysInObject = (
  data: Record<string, any>
): Record<string, any> => {
  const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
    const newKey = key === "_id" ? key : snakeCaseToCamelCase(key);

    if (Array.isArray(value)) {
      if (value.length && typeof value[0] === "object") {
        const transformedArray = value.map((item) =>
          transformKeysInObject(item)
        );
        return { ...acc, [newKey]: transformedArray };
      }
      return { ...acc, [newKey]: value };
    }

    if (typeof value === "object" && value !== null) {
      const transformedObject = transformKeysInObject(value);
      return { ...acc, [newKey]: transformedObject };
    }

    return { ...acc, [newKey]: value };
  }, {});

  return transformedData;
};

const swrMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    if (!swr.data) {
      return swr;
    }

    const data = swr.data.data || swr.data;
    if (data.length && typeof data[0] === "object") {
      const transformedKeys = transformKeysInObject(data);

      const updatedSWR = {
        ...swr,
        data: { ...swr.data, data: Object.values(transformedKeys) },
      };
      return updatedSWR;
    }

    const updatedSWR = {
      ...swr,
      data: { ...swr.data, data: transformKeysInObject(data) },
    };
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
