"use server";

import prisma from "@/lib/db";
import { createProjectSchema } from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import z from "zod";
import { v4 as uuidv4 } from 'uuid';
import { ROLE } from "@/lib/types";

export const CreateProject = async(data: z.infer<typeof createProjectSchema>) => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not found");
    }
    const {
        name,
        description,
        priority,
        tags,
      targetDate,
        status,
    } = data;
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
        targetDate,
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
            role:  ROLE.ADMIN,
          }
        }
      },
    });
    revalidateTag(`projects-${user.id}`);

    return project;
};

   


