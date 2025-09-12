import bcrypt from "bcrypt";
import userRepository from "../repository/userRepository";
class userService {
  async registerUser(username: string, email: string, password: string) {
    const results = await userRepository.getUserByUsernameOrEmail(username, email);

    if (results) {
      return null;
    }

    //PUT INTO REPOSITORY
    const saltRounds: number = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    //add user prisma
    const newUser = await userRepository.createUser(username, email, hashedPassword, salt);
    console.log(newUser);
    return newUser;
  }

  async getUserByUsername(username: string) {
    const res = await userRepository.getUserByUsername(username);
    return res;
  }

  async getUserById(userId:number) {
    const res = await userRepository.getUserById(userId);
    return res;
  }

  async decrementUserPokeballs(userId:number) {
    const res = await userRepository.usePokeball(userId)
    return res;
  }
}

export default new userService();
