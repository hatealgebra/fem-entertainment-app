import { NextRequest, NextResponse } from "next/server";

const withErrorHandler = (fn) => {
  return async (request: NextRequest, ...args) => {
    try {
      return await fn(request, ...args);
    } catch (error) {
      console.log({ error });
      return NextResponse.json(
        { error: "Internal Server Error", success: false },
        { status: 500, statusText: "Internal Server Error" }
      );
    }
  };
};

export default withErrorHandler;
