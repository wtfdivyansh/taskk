"use server"
import prisma from "@/lib/db";
import { createTaskSchema} from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateCard = async (data:z.infer<typeof createTaskSchema>,boardId:string,columnId:string) => {
  const user = await currentUser();
  console.log(columnId);
  if (!user) {
    throw new Error("User not found");
  }
  const lastCard = await prisma.task.findFirst({
    where: {
      columnId: columnId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const { title, description,  tags, dueDate, status,image,assignee } = data;
  const position = lastCard ? lastCard.position + 1 : 1;
  const CardTags = await prisma.tags.findMany({
    where: {
      name: {
        in: tags,
      },
    },
  });

  console.log(status)

  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
      position: position,
      priority: status,
      dueDate: dueDate,
      columnId: columnId,
      image:image ?? "",
      tags: {
        create: CardTags.map((tag) => ({ tagId: tag.id })),
      },
      assigneeId:assignee,
      createdById: user.id,
    },
  });
  console.log(task);
  revalidatePath(`/tasks/${boardId}`);
  return task;
};