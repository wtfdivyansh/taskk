"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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
      revalidatePath("/tasks");

    return project;
};

export const getProjects = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const createdProjects = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
    
  });

  const memberProjects = await prisma.board.findMany({
    where: {
      boardMembers: {
        some: {
          userId: user.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  
   

  const allProjects = [...createdProjects, ...memberProjects];


  const uniqueProjects = allProjects.filter(
    (project, index, self) =>
      index === self.findIndex((t) => t.id === project.id)
  );

  return uniqueProjects;
};