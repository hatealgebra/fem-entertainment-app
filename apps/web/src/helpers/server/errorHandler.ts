import { NextRequest, NextResponse } from "next/server";

const withErrorHandler = (fn) => {
  return async (request: NextRequest, ...args) => {
    try {
      return await fn(request, ...args);
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};

export default withErrorHandler;
