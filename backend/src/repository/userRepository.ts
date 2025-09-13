
import prisma from "../config/prisma";

class userRepository {
  async getUserById(userId: number) {
    return await prisma.user.findFirst({
      where: { id: userId }
    })
  }

  async getUserByUsernameOrEmail(username: string, email: string) {
    const res = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    return res;
  }

  async getUserByUsername(username: string) {
    const res = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return res;
  }

  async createUser(username: string, email: string, password: string, salt: string) {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: password,
        salt,
        dateJoined: new Date(),
        pokeballs: 1,
      },
      select: {
        id: true,
        username: true,
      },
    });
    return newUser;
  }

  async usePokeball(userId:number) {
    const res = await prisma.user.update({
      where: {id: userId},
      data: {
        pokeballs: {
          decrement: 1
        }
      }
    })
  }

  async getUserActivePokemon(userId: number) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        activeSlot: {
          include: {
            pokemon: true
          }
        }
      }
    });

    return user?.activeSlot?.pokemon;
  }

  async getUserFriends(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        friends: {
          select: {
            id: true,
            username: true,
            icon: true,
          }
        }
      }
    })

    return user?.friends ?? []
  }

  async getUserFriendRequests(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        receivedRequests: true
      }
    })

    return user?.receivedRequests ?? []
  }

  async deleteFriendRequest(requestId: number) {
    await prisma.friendRequest.delete({
      where: { id: requestId }
    })
  }

  async addFriendToUser(userId: number, friendId: number) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId }
        } 
      }
    })
  }

}

export default new userRepository();
