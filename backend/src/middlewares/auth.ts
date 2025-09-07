import type { NextFunction, Request, Response } from "express";
import { validateSession } from "../util/util";

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const sessionData = req.session ? await validateSession(req.session) : null

  if (!sessionData) return res.status(401).json({ error: "Invalid session" })

  return next()
}