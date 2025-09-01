import taskRepository from "../repository/taskRepository"
import userRepository from "../repository/userRepository"

class taskService {
  async getTasks(userId: number) {
    const user = await userRepository.getUserById(userId)
    
    if (!user) throw new Error("Invalid user")

    const tasks = await taskRepository.getTasksByUserId(userId)
    
    return tasks
  }
}

export default new taskService()