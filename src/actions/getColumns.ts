import prisma from "@/lib/db";
export const getColumns = async (boardId: string) => {
  const columns = await prisma.column.findMany({
    where: {
      boardId: boardId,
    },
    orderBy: {
      createdAt: "asc",
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
  });
  return columns;
};