"use server"
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_cache as cache } from "next/cache";

export const getAttachments = async (taskId:string) => {
  const user = await currentUser();
  if(!user){
    throw new Error("User not found");
  }
  const attachments = await prisma.attachment.findMany({
    where: {
      taskId:taskId
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return attachments
};
