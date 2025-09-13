import friendRepository from "../repository/friendRepository";

class friendService {
  async getUserFriends(userId:number) {
    return await friendRepository.getUserFriends(userId);
  }

  async getUserFriendRequests(userId:number) {
    return await friendRepository.getUserFriendRequests(userId);
  }

  async getUserFriendSentRequests(userId:number) {
    return await friendRepository.getUserSentRequests(userId);
  }

  async sendFriendRequest(fromUserId: number, toUserId: number) {
    if (fromUserId === toUserId)
      throw new Error("Cannot send request to same user!")

    const userFriends = await friendRepository.getUserFriends(fromUserId)
    
    for (const friend of userFriends) {
      if (friend.id === toUserId)
        throw new Error("Users are already friends!")
    }

    return await friendRepository.createFriendRequest(fromUserId, toUserId);
  }

  async updateFriendRequest(requestId: number, accept: boolean) {
    const request = await friendRepository.getFriendRequest(requestId)

    if (!request)
      throw new Error("Invalid requestId")

    if (accept) {
      await friendRepository.addFriendToUser(request.fromUserId, request.toUserId)
      await friendRepository.addFriendToUser(request.toUserId, request.fromUserId)
    }

    await friendRepository.updateFriendRequest(requestId, false)
  }
}

export default new friendService();
