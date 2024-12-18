"use server"
import prisma from "@/lib/db"
import { updateTaskSchema } from "@/lib/schema"
import { currentUser } from "@clerk/nextjs/server"
import { z } from "zod"

export const updateTask = async (
  taskId: string,
  data: any
) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const updatedData = {
    ...data,
    assigneeId: data.assigneeId ?? user.id,
  };
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: updatedData,
  });
  console.log(task);
  return task;
};   