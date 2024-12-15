"use server"

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAssignee = async (boardId:string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const users = await prisma.boardMember.findMany({
    where: {
     boardId:boardId
    },
  });
  return users
};