import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export async function GetProjectInfo(ProjectId:string) {
    const user = await currentUser()
    if (!user) {
       redirect("/signin")
    }
    const project =  await prisma.board.findUnique({
    where: { id: ProjectId },
    select: {
      id: true,
      name: true,
      status: true,
      priority: true,
      dueDate: true,
      description: true,
      isPersonal: true,
      boardMembers: {
        include: {
          user: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
   return project;
}
   