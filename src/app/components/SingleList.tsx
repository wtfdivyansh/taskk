"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCardModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Column, Task } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import SingleCard from "./SingleCard";
import { ColumnProps } from "@/lib/types";
import { Droppable } from "@hello-pangea/dnd";

interface SingleListProps {
  column: Column & {  todos: ({
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
    })[];
} };

export default function SingleList({column}:ColumnProps) {
    const {isOpen, setIsOpen,setBoardId,setColumnId,columnId} = useCardModalStore();
    const handleClick = () => {
      setBoardId(column.boardId)
      setColumnId(column.id)
      setIsOpen(true)
    }
   
    return (
    
      
      <div className="flex flex-col gap-y-1 bg-[#0b0b0b] rounded-lg px-1 py-2 h-fit w-72  " >
        <div
          className={cn(
            `flex flex-row items-center gap-x-2 bg-trasnparent p-2 rounded-lg justify-between group `
          )}
        >
          <div className="flex flex-row items-center gap-x-2">
            <span
              className={cn(`bg-${column.color} h-6 w-1 rounded-lg `)}
            ></span>
            <h1>{column.name}</h1>
            
            <Badge className="text-xs  bg-sky-500/40 bg-neutral-900 border border-neutral-700/[0.2] text-neutral-400 ring-1/[0.5] ring-white mx-2">
              {column.todos.length}
            </Badge>
          </div>
          <div>
            <div>
              <Plus
                size={16}
                className="text-neutral-500 group-hover:text-neutral-100 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
        <Droppable droppableId={column.id} direction="vertical" type="task">
          {(provided) => (
        <div className="flex flex-col gap-y-2 p-2" ref={provided.innerRef} {...provided.droppableProps}>
          {column.todos.map((task, index) => (
            <SingleCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
        )}
        </Droppable>
        <div>
          <Button className="bg-trasnparent border border-dashed w-full text-neutral-500 hover:bg-transparent hover:text-neutral-200 group"
          onClick={handleClick}
          >
            <Plus
              size={16}
              className="text-neutral-500 group-hover:text-neutral-100 group-hover:scale-110  "
            />
            <span className="text-neutral-500 group-hover:text-neutral-100">Add Task</span>
          </Button>
        </div>
      </div>
    
 
    );
    
}