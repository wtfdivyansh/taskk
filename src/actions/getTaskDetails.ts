import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getTaskDetails = async (taskId: string, search?: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
 

  const baseQuery = {
    where: {
      id: taskId,
    },
    include: {
      columns: {
        include: {
          todos: {
            include: {
              tags: {
                include: {
                  tag: true,
                },
              },
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      boardMembers: {
       include:{
         user: true,
       }
      },
      
      
    },
  };

  if (search && search.trim() !== "") {

    const task = await prisma.board.findUnique({
      ...baseQuery,
      include: {
        ...baseQuery.include,
        columns: {
          ...baseQuery.include.columns,
          include: {
            ...baseQuery.include.columns.include,
            todos: {
              ...baseQuery.include.columns.include.todos,
              where: {
                title: {
                  contains: search,
                  mode: "insensitive", 
                },
              },
            },
          },
        },
      },
    });
    

    if (!task || task.columns.every((column) => column.todos.length === 0)) {
      return await prisma.board.findUnique(baseQuery);
    }
     revalidatePath("/tasks/" + task.id);
    return task;
  } else {
    return await prisma.board.findUnique(baseQuery);
  }
};
