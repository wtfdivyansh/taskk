"use server"
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath } from "next/cache";

export const getColumns = async (boardId: string) => {
  const columns = await prisma.column.findMany({
    where: {
      boardId: boardId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      todos: {
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      },
     },
  });
  
  revalidatePath(`/tasks/${boardId}`);
  return columns;
};