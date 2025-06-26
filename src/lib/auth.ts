import { verifyToken } from "@/utils/token_helper";
import type { NextRequest } from "next/server";

export const getTokenFromRequest = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  console.log("Auth Header:", authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
};

export const verifyAuthToken = (request: NextRequest) => {
  const token = getTokenFromRequest(request);

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  console.log("Decoded Token:", decoded);
  return decoded;
};
