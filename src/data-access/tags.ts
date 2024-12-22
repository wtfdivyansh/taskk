"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getTags = async () => {
const user = await currentUser();
  if (!user) {
   throw new Error("User not found");
  }

  const tags = await prisma.tags.findMany({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
    },
  });
  return tags
}

export const getTagByTask = async (taskId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const tags = await prisma.tags.findMany({
    where: {
      userId: user.id,
      taskTags: {
        none: {
          taskId: taskId,
        },
      },
    },
    select: {
      name:true,
      id:true
    },
  });
  const tagsByUser = await prisma.taskTags.findMany({
    where: {
      taskId: taskId,
    },
  });
  const tagWithString = tags.map((tag) => {
    return tag.name
  })

  return {
    data: tags,
    count: tagsByUser.length
  }
}

