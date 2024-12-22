"use server";

import { addTaskSchema } from "@/app/components/modal/add-task-tag";
import prisma from "@/lib/db";
import { getRandomColor } from "@/lib/helper";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export const addTagsToTask = async (taskId: string, data: z.infer<typeof addTaskSchema>) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const taskTags = await prisma.taskTags.createMany({
    data: data.tags.map((tag) => ({
      taskId: taskId,
      tagId: tag.value,
    })),
  });

  console.log(data)
  return taskTags
};
