"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { unstable_cache as cache } from "next/cache";

import { v4 as uuidv4 } from 'uuid';

export const CreateProject = async( { name, dueDate, status, tags, description, priority }: any) => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not found");
    }
   const projectTags = await prisma.tags.findMany({
    where: {
      name: {
        in: tags,
      },
    },
  });;
    const project = await prisma.board.create({
      data: {
        name,
        dueDate,
        status,
        userId: user.id,
        description: description,
        priority: priority,
        tags: {
          create: projectTags.map((tag) => ({ tagId: tag.id })),
        },
        inviteCode: uuidv4(),
        boardMembers:{
          create: {
            userId: user.id,
            role: "owner",
          }
        }
      },
    });
      revalidateTag(`projects-${user.id}`);

    return project;
};

   


