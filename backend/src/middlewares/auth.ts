import type { NextFunction, Request, Response } from "express";
import { validateSession } from "../util/util";

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const sessionData = req.session ? await validateSession(req.session) : null

  if (!sessionData) {
    return res.status(401).json({ error: "Invalid session" })
  }

  const userId = sessionData?.userId

  if (userId === undefined || typeof userId !== "number") {
    return res.status(401).json({ error: "Invalid user" })
  }

  return next()
}