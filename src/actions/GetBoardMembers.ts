"use server"
import prisma from "@/lib/db";
import { cache } from "react";

export async function GetBoardMembers (boardId: string) {
    const boardMembers = await prisma.boardMember.findMany({
      where: {
        boardId: boardId
      },
      select:{
        id:true,
        role:true,
        user:{
        select:{
            name:true,
            profileImage:true

        }
        }
      }
     
    });
    const invitecode = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
      select:{
        inviteCode:true

      }
    });
    const inviteCode = invitecode?.inviteCode
    return {
      boardMembers,
      inviteCode
    }
  }