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

    const tasks = await taskRepository.createTask({ 
      userId,
      description,
      dueDate: dueDate ?? null
    })
    
    return tasks
  }

  async updateTask(
    userId: number,
    taskId: number,
    description?: string,
    complete?: boolean,
    dueDate?: Date,
  ) {
    const user = await userRepository.getUserById(userId)

    if (!user)
      throw new Error("Invalid user")

    const task = await taskRepository.getTaskById(taskId)

    if (!task)
      throw new Error("Invalid task")
    else if (task.userId !== userId)
      throw new Error("Task does not belong to user")

    if (description === undefined && complete === undefined && dueDate === undefined)
      throw new Error("No values specified to update")

    // TODO: update exp of user's active pokemon
    if (complete !== undefined) {
      console.log("update user's active pokemon here...")
    }

    const updatedTask = await taskRepository.updateTask(taskId, {
      ...(description !== undefined && { description }),
      ...(complete !== undefined && { complete }),
      ...(dueDate !== undefined && { dueDate }),
    })
    
    return updatedTask
  }
}

export default new taskService()