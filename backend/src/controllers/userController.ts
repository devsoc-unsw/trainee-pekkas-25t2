import express, { Request, Response } from "express";
import userService from "../services/userService";
import { error } from "console";
class userController {
  async createUser(req: Request, res: Response){
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
        }

        //add user prisma
        const newUser = await userService.registerUser(username, email, password);
        if (!newUser) {
            console.log(newUser)
            return res.status(400).json({
                error:"Account using Username or Email already exists"
            })
        }
        return res.status(201).json({
        newUser,
        });
    }
}

export default new userController();