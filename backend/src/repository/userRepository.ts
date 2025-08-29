import { PrismaClient, Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";

class userRepository {
    async getUserByUsernameOrEmail(username:string, email:string) {
        const res = await prisma.user.findFirst({
            where: {
                OR: [{ username: username }, { email: email }],
            },
        });

        return res;
    }
    //resetemojilol
    async createUser(username:string, email:string, password:string, salt:string) {
        const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: password,
            salt,
            dateJoined: new Date(),
            pokeballs: 1
        },
        select: {
            id: true,
            username: true,
        },
        });
        return newUser;
    }
}

export default new userRepository();