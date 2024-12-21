"use server"
import prisma from "@/lib/db"
import { updateTaskSchema } from "@/lib/schema"
import { currentUser } from "@clerk/nextjs/server"
import { z } from "zod"

export const updateTask = async (
  taskId: string,
  data: z.infer<typeof updateTaskSchema>
) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...data,
      tags:{
       
      }
    }
  });
  console.log(task);
  return task;
};   