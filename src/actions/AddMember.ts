"use server"
import { Option } from "@/components/ui/multi";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function AddMember(boardId: string, data: {users: Option[]}) {
    const {users}=data
    console.log(users);
    {users.map(async (user) => {
        await prisma.boardMember.create({
          data: {
            boardId: boardId,
            userId: user.value,
            role: "member",
          },
        });
      })}
 
  revalidatePath("/tasks/" + boardId);
}