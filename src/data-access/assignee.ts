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
    select:{
      user:{
        select:{
          id:true,
          name:true,
          profileImage:true
        }
      }
    }
  });
  const assignee = users.map((user)=>user.user)
  return assignee
};