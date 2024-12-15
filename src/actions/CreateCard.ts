"use server"
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const CreateCard = async (data: any,boardId:string,columnId:string) => {
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

  const task = await prisma.task.create({
    data: {
      title: title,
      content: description,
      position: position,
      priority: status,
      dueDate: dueDate,
      columnId: columnId,
      image:image ?? "",
      tags: {
        create: CardTags.map((tag) => ({ tagId: tag.id })),
      },
      assigneeId:assignee,
    },
  });
  console.log(task);
  revalidatePath(`/tasks/${boardId}`);
  return task;
};