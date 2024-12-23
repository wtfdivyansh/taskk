"use server";
import prisma from "@/lib/db";
import { PriorityEnum } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { equal } from "assert";
import { title } from "process";

export const getTaskDetails = async (
  boardId: string,
  search: string | null,
  priority: string | null,
  assignee: string | null,
  dueDate: string | null
) => {
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
    return [];
  }
  const conditions: any = {};
  if (priority) {
    conditions.priority = { equals: priority as PriorityEnum};
  }

  if (assignee) {
    conditions.assigneeId = { equals: assignee };
  }
  if (dueDate) {
    conditions.dueDate = { equals: dueDate };
  }
  if (search && search.trim() !== "") {
    conditions.OR = [
      {title : {contains: search, mode: "insensitive"}},
      {description : {contains: search, mode: "insensitive"}},
    ]
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
        where: conditions
      },
    },
  };

 
  console.log("conditions",conditions);

  const columns = await prisma.column.findMany(baseQuery);

  return columns;
};

export const getTaskById = async (taskId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  if (!taskId || typeof taskId !== "string" || taskId.trim() === "") {
    throw new Error("Invalid task ID");
  }
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      assignee: true,
    },
  });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};
