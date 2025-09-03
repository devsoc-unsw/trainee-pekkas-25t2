import taskRepository from "../repository/taskRepository"
import userRepository from "../repository/userRepository"

class taskService {
  async getTasks(userId: number) {
    const user = await userRepository.getUserById(userId)
    
    if (!user) throw new Error("Invalid user")

    const tasks = await taskRepository.getTasksByUserId(userId)
    
    return tasks
  }

  async createTask(userId: number, description: string, dueDate?: Date) {
    const user = await userRepository.getUserById(userId)
    
    if (!user) throw new Error("Invalid user")

    const tasks = await taskRepository.createTask(userId, description, dueDate)
    
    return tasks
  }
}

export default new taskService()