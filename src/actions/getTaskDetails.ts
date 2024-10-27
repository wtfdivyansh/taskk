import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";


export const getTaskDetails = async (boardId: string, search?: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const baseQuery = {
    where: {
      boardId: boardId,
    },
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
  };

  if (search && search.trim() !== "") {
    const columns = await prisma.column.findMany({
      ...baseQuery,
      include: {
        ...baseQuery.include,
        todos: {
          ...baseQuery.include.todos,
          where: {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
    });

    if (!columns || columns.every((column) => column.todos.length === 0)) {
      // If no todos found with search, return all columns with their original todos
      return await prisma.column.findMany(baseQuery);
    }
    return columns;
  } else {
    return await prisma.column.findMany(baseQuery);
  }
};
