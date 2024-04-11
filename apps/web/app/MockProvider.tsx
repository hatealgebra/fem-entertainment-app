"use client";
import { ReactNode, useEffect } from "react";
import { handlers } from "../src/msw/handlers";

interface MockProviderProps {
  children: ReactNode;
}

const MockProvider = ({ children }: MockProviderProps) => {
  const set = async () => {
    if (typeof window !== "undefined") {
      if (typeof window !== "undefined") {
        const { setupWorker } = await import("msw/browser");
        const worker = setupWorker(...handlers);
        worker.start();
      }
    }
  };

  useEffect(() => {
    set();
  }, []);

  return children;
};

export default MockProvider;
