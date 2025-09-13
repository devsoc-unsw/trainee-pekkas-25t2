
import prisma from "../config/prisma";

class friendRepository {
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
    const requests = await prisma.friendRequest.findMany({
      where: {
        toUserId: userId,
        isActive: true
      },
      include: {
        fromUser: {
          select: { id: true, username: true, icon: true }
        }
      }
    });

    return requests;
  }

  async getUserSentRequests(userId: number) {
    const requests = await prisma.friendRequest.findMany({
      where: {
        fromUserId: userId,
        isActive: true
      },
      include: {
        fromUser: {
          select: { id: true, username: true, icon: true }
        }
      }
    });

    return requests;
  }

  async updateFriendRequest(requestId: number, isActive: boolean) {
    await prisma.friendRequest.update({
      where: { id: requestId },
      data: { isActive }
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

  async getFriendRequest(requestId: number) {
    return await prisma.friendRequest.findUnique({
      where: { id: requestId }
    })
  }

  async createFriendRequest(fromUserId: number, toUserId: number) {
    return await prisma.friendRequest.upsert({
      where: {
        fromUserId_toUserId: { 
          fromUserId, 
          toUserId 
        },
      },
      update: {
        isActive: true,
        createdAt: new Date()
      },
      create: {
        fromUserId,
        toUserId,
        isActive: true
      }
    });
  }
}

export default new friendRepository();
