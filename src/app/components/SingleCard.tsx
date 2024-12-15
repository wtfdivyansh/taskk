"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { RiProgress4Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Paperclip } from "lucide-react";
import { TaskProps } from "@/lib/types";
import { Draggable } from "@hello-pangea/dnd";
import Link from "next/link";
import { TaskSheet } from "./sheet/task-sheet";

interface SingleCardProps {
  task: {
    tags: ({
      tag: {
        id: string;
        name: string;
        userId: string;
        color: string | null;
      };
    } & {
      taskId: string;
      tagId: string;
    })[];
  } & {
    id: string;
    title: string;
    content: string | null;
    position: number;
    priority: string | null;
    dueDate: Date | null;
    image: string | null;
    columnId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  index:number;
}
export default function SingleCard({task,index}:TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index} >
      {(provided,snapshot) => {
      return (
        <div
          className="flex flex-col mx-auto w-full drag:top-auto drag:left-auto  "
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            left: "auto !important",
            top: "auto !important",
          }}
        >
          <Card className="flex flex-col bg-[#0d0d0d] shadow-md border  border-neutral-700/[0.2] rounded-xl cursor-grab ">
            {task.image && (
              <>
                <div className="flex flex-col items-center justify-center w-full relative">
                  <img
                    src={task.image}
                    className="w-full h-36 p-1 rounded-2xl object-cover object-top"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0d0d0d] to-transparent rounded-2xl"></div>
                </div>
              </>
            )}
            <div className="flex flew-row px-2 gap-x-2 my-2">
              {task.tags &&
                task.tags.map((t, index) => (
                  <Badge
                    key={index}
                    className={cn(
                      "text-xs text-neutral-300 w-fit h-fit px-1 ",
                      t.tag.color
                    )}
                  >
                    {t.tag.name}
                  </Badge>
                ))}
              <Badge
                className={cn(
                  "text-xs text-neutral-300 w-fit h-fit px-1 flex flex-row items-center gap-x-1",
                  {
                    "bg-white/15 text-white": task.priority === "low",
                    "bg-yellow-500/40 text-yellow-500":
                      task.priority === "medium",
                    "bg-red-500/40 text-red-500": task.priority === "high",
                  }
                )}
              >
                <RiProgress4Line size={16} />
                {task.priority}
              </Badge>
            </div>
            <div>
              {/* // @ts-ignore */}
              <TaskSheet task={task}>
                <div className="flex flex-col  flex-grow px-2 pb-4">
                  <p className="text-white text-md">{task.title}</p>
                  {task.content && (
                    <p className="text-neutral-500 text-sm">
                      {task.content?.slice(0, 35)}{" "}
                      {task?.content?.length > 36 ? "..." : ""}
                    </p>
                  )}
                </div>
              </TaskSheet>
            </div>

            <div className="flex flex-col mt-1 gap-x-1 pb-2 px-2 ">
              <div className="flex flex-row items-center gap-x-2 w-full justify-between">
                <div>
                  <Avatar className="h-6 w-6 ">
                    {task.assignee && <AvatarImage src={task.assignee.profileImage || "https://via.placeholder.com/150"} alt={task.assignee.id} className="h-6 w-6 rounded-full" />}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-row items-center gap-x-1 ">
                  <Paperclip size={16} className="text-neutral-600" />
                  <MessageSquare size={16} className="text-neutral-600" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      );}}
    </Draggable>
  );
}