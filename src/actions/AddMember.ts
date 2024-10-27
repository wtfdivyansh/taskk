"use server"
import { Option } from "@/components/ui/multi";
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath, revalidateTag } from "next/cache";
import { MdOutlineWineBar } from "react-icons/md";

export async function AddMember(boardId: string, data: {users: Option[]}) {
    const {users}=data
    console.log(users);
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });
    if(!board){ 
      throw new Error("Board not found")
    }
     {users.map(async (user) => {
        await prisma.boardMember.create({
          data: {
            boardId: boardId,
            userId: user.value,
            role: "member",
          },
        });
      })}

      pusherServer.trigger("invite","invite",{
        owner: board.userId,
        message: `You have been added to ${board.name}`
      } );
  users.map((user)=> revalidateTag(`projects-${user.value}`));
  revalidatePath("/tasks/" + boardId);
}