import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const usersNotInBoard = async (boardId: string) => {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
  const usersNotInBoard= await prisma.user.findMany({
    where: {
      NOT: {
        boardMember: {
          some: {
            boardId: boardId,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      profileImage: true,
    },
  });
  if(!usersNotInBoard){
    return []
  }
  return usersNotInBoard;
};