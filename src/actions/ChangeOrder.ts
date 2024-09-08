"use server"
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { BoardsProps, TaskProps } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { Board } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getColumns } from "./getColumns";
interface ChangeOrderProps {
    items: TaskProps["task"][];
    boardId:string;
}
export async function changeOrder({items,boardId}:ChangeOrderProps) {
   console.log(items);
   const newOrder = items.map(async(item, index) => {
       return await prisma.task.update({
         where: {
           id: item.id,
         },
         data: {
           position: item.position,
           columnId: item.columnId,
         },
       });
     })
  const newData = await getColumns(boardId);
  console.log(newData);
  await pusherServer.trigger(boardId, "board-update", {
    newData
  });

 
  revalidatePath(`/tasks${boardId}`);
  return newOrder;
}   