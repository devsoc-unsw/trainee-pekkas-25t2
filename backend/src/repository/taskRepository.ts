import prisma from "../config/prisma";

class taskRepository {
  async getTasksByUserId(userId: number) {
    const res = await prisma.task.findMany({
      where: { userId },
    });

    return res;
  }

  async createTask(userId: number, description: string, complete: boolean, dueDate: Date) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error("User does not exist");

    return await prisma.task.create({
      data: {
        userId,
        description,
        complete,
        dueDate,
      },
      select: {
        id: true,
        userId: true,
        description: true,
        complete: true,
        created: true,
        lastUpdated: true,
        dueDate: true,
      },
    });
  }

  async getTaskById(id: number) {
    return await prisma.task.findFirst({
      where: { id },
    });
  }
}

export default new taskRepository();
