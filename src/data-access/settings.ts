import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getSettings = async (boardId:string) => {
  const user = await currentUser()
 if(!user ){
    throw new Error("not authenticated")
 }
 const settings = await prisma.board.findUnique({
   where:{
    id :boardId
   }
 })
 return settings

};