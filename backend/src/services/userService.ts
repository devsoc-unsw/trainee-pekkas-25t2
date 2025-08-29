import bcrypt from "bcrypt";
import userRepository from "../repository/userRepository";
class userService {
    async registerUser(username:string, password:string, email:string) {
    const results = await userRepository.getUserByUsernameOrEmail(username, email)

        if (results) {
            return null;
        }

        //PUT INTO REPOSITORY
        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        //add user prisma
        const newUser = await userRepository.createUser(username, email, hashedPassword, salt);
        return newUser;
    }

}

export default new userService();