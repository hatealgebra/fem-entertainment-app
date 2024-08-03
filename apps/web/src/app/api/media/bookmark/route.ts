import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../../helpers/server/errorHandler";

export const PUT = withErrorHandler(async (req: NextRequest) => {
  console.log(req.body);
  return NextResponse.json({ message: "Bookmark added" }, { status: 200 });
});
