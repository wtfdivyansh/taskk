"use server"
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createList = async (name: string, color: string,boardId: string) => {
 const user = await currentUser()
 if (!user) {
   throw new Error("User not found")
 }
   const column = await prisma.column.create({
     data: {
       name,
       color,
       boardId:boardId,
     }
   })
   revalidatePath(`/tasks/${boardId}`)
   return column

};  