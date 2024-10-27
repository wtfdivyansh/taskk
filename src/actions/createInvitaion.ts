"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export const generateNewInviteLink = async (boardId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if the user has permission to generate a new invite link
  const boardMember = await prisma.boardMember.findFirst({
    where: {
      boardId: boardId,
      userId: user.id,
      role: { in: ["OWNER", "ADMIN"] }, // Adjust roles as needed
    },
  });

  if (!boardMember) {
    throw new Error(
      "You don't have permission to generate a new invite link for this board"
    );
  }

  // Generate a new invite code
  const newInviteCode = uuidv4();

  // Update the board with the new invite code
  const updatedBoard = await prisma.board.update({
    where: { id: boardId },
    data: { inviteCode: newInviteCode },
  });

  // Generate the new invite link
  const newInviteLink = getInviteLink(newInviteCode);

  return { inviteLink: newInviteLink };
};

const getInviteLink = (inviteCode: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteCode}`;
};



export const joinBoardViaInvite = async (inviteCode: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const board = await prisma.board.findUnique({
    where: { inviteCode },
  });

  if (!board) {
    throw new Error("Invalid invite code");
  }


  const existingMember = await prisma.boardMember.findFirst({
    where: {
      boardId: board.id,
      userId: user.id,
    },
  });

  if (existingMember) {
    return redirect("/tasks/"+board.id);
  }
  return board


 
};

export const acceptInvitation = async (boardId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

    const existingMember = await prisma.boardMember.findFirst({
      where: {
        boardId: boardId,
        userId: user.id,
      },
    });

    if (existingMember) {
      return redirect("/tasks/"+boardId);
    }


  await prisma.boardMember.create({
    data: {
      boardId: boardId,
      userId: user.id,
      role: "MEMBER",
    },
  });
  revalidateTag(`projects-${user.id}`);

  redirect("/tasks/"+boardId);
 
};  
