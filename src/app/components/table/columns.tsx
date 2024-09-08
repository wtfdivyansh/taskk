"use client";

import { ColumnDef } from "@tanstack/react-table";
import {Task}from "@prisma/client";
import { Todo, TodoTag } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import { RiProgress4Line } from "react-icons/ri";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type tasks = {
  title:string;
  assignedTo: string[];
  dueDate: Date | null,
  startDate: Date,
  tags: TodoTag[];
  priority: string | null;
};

export const columnsList: ColumnDef<tasks>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return <div>{format(row.getValue("dueDate"), "yyyy-MM-dd")}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return <div>{format(row.getValue("startDate"), "yyyy-MM-dd")}</div>;
    },
  },
  {
    accessorKey:"tags",
    header: "Tags",
    cell: ({ row }) => {
      
      const tags: TodoTag[] = row.getValue("tags");
      console.log(tags)
      return tags.map((t, index) => (
        <Badge
          key={index}
          className={cn(
            "text-xs border border-neutral-700/[0.3]  ",
            t.tag.color
          )}
        >
          {t.tag.name}
        </Badge>
      ));
    },

  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      return (
        <Badge
          className={cn(
            "text-xs text-neutral-300 w-fit h-fit px-2 flex flex-row items-center gap-x-1",
            {
              "bg-white/15 text-white": priority === "low",
              "bg-yellow-500/40 text-yellow-500": priority === "medium",
              "bg-red-500/40 text-red-500": priority === "high",
            }
          )}
        >
          <RiProgress4Line size={16} />
          {priority}
        </Badge>
      );
    },
  },
];
