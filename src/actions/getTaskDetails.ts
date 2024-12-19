"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getTaskDetails = async (boardId: string, search: string | null) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }


  if (!boardId || typeof boardId !== "string" || boardId.trim() === "") {
    throw new Error("Invalid board ID");
  }


  const existingColumns = await prisma.column.findMany({
    where: {
      boardId: boardId,
    },
  });

  if (existingColumns.length === 0) {
    return []
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
          assignee: true,
        },
      },
    },
  };


  if (search && search.trim() !== "") {
    const columnsWithSearch = await prisma.column.findMany({
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

    if (
      !columnsWithSearch ||
      columnsWithSearch.every((column) => column.todos.length === 0)
    ) {
      return await prisma.column.findMany(baseQuery);
    }

    return columnsWithSearch;
  }

  const columns = await prisma.column.findMany(baseQuery);
  if (!columns) {
    throw new Error("Unexpected error: No data found");
  }

  return columns;
};
