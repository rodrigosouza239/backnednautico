import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  master: boolean;
  employee: boolean;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: "Token invalido" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "secret");
    const { id, master, employee } = data as TokenPayload;

    request.usersId = id;
    request.useMaster = master;
    request.useEmployee = employee;
    return next();
  } catch {
    return response.sendStatus(401);
  }
}
