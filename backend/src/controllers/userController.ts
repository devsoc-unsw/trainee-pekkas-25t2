import type { Request, Response } from "express";
import userService from "../services/userService";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { createUserBody, loginUserBody, usernameBody } from "../types/user";

class userController {
  async createUser(req: Request<{}, {}, createUserBody, {}>, res: Response) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //add user prisma
    const newUser = await userService.registerUser(username, email, password);
    if (!newUser) {
      console.log(newUser);
      return res.status(400).json({
        error: "Account using Username or Email already exists",
      });
    }
    return res.status(201).json({
      newUser,
    });
  }

  async loginUser(req: Request<{}, {}, loginUserBody, {}>, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Find user
      const user = await userService.getUserByUsername(username);

      if (!user) {
        return res.status(400).json({ error: "User doesnt exist!" });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }

      // Set user session
      req.session.userId = user.id;
      req.session.cookie.expires = dayjs().add(1, "week").toDate();
      req.session.save(); // Explicitly save session to Redis
      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        dateJoined: user.dateJoined,
      });
    } catch (_error) {
      return res.status(500).json({ error: "Error logging in" });
    }
  }

  async getUserByName(req: Request<{}, {}, usernameBody, {}>, res:Response) {
    try {
      const { username } = req.body;
      const user = await userService.getUserByUsername(username);

      if (user === null) {
        return res.status(200).json(null);
      }

      return res.status(200).json({
          id: user.id,
          username: user.username,
          icon: user.icon,
          featured_pokemon: user.featured_pokemon
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({error: error.message});
      }
      return res.status(500).json({error: "Internal Server Error"});
    }
  }

  async getUserPokeballs(req:Request, res:Response) {
    try {
      const userId = req.session.userId as number
      if (!userId) return res.status(401).json({ error: "Not authenticated" });
      const res2 = userService.getUserPokeballs(userId);
      return res.status(200).json(res2);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({error: error.message});
      }
      return res.status(500).json({error: "Internal Server Error"});
    }
  }
}

export default new userController();
