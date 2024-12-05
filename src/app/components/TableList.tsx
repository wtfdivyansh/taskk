"use client"
import { BoardsProps } from "@/lib/types";
import { columnsList } from "./table/columns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCardModalStore} from "@/hooks/use-modal-store";
export default function TableList({ columns }: BoardsProps ) {
  const {setIsOpen}= useCardModalStore()
  
  return (
    <div className="flex flex-col mx-auto rounded-lg bg-[#0b0b0b] w-full h-screen gap-y-1 ">
      {columns.map((column, index) => {
        const tasks = column.todos.map((task) => {
          return {
            title: task.title,
            assignedTo: ["divyansh"],
            dueDate: task.dueDate,
            startDate: task.createdAt,
            tags: task.tags,
            priority: task.priority,
          };
        })
        

        return (
          <div className=" bg-transparent px-1 rounded-lg w-full shadow-2xl border-2 border-neutral-700/[0.2]">
            <Accordion type="single" collapsible className="w-full">
              
                <AccordionItem value="item-1" defaultChecked={true}>
                  <AccordionTrigger
                    className={cn(
                      `flex flex-row items-center gap-x-2  w-44  bg-neutral-90/70 shadow-sm transition-all border-b border-neutral-700/[0.2] `
                    )}
                  >
                    <div className="flex flex-row items-center gap-x-2 ">
                      <span
                        className={cn(
                          `bg-${column.color} bg-opacity-10 h-6 w-6 p-1 rounded-full flex flex-row items-center justify-center`
                        )}
                      >
                        <span
                          className={cn(
                            `bg-${column.color}  h-3 w-3  rounded-full `
                          )}
                        ></span>
                      </span>
                      <h1>{column.name}</h1>
                      <Badge className="text-xs  bg-sky-500/40 bg-neutral-900 border border-neutral-700/[0.2] text-neutral-400 ring-1/[0.5] ring-white mx-2">
                        {column.todos.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className=" w-full  bg-black/30 p-2 ">
                    <div className="flex flex-col mx-auto mt-4  rounded-lg w-full  " onClick={()=>setIsOpen(true)}>
                      <Button className=" bg-black text-muted-foreground rounded-lg px-2 w-[96%] mx-auto border-dashed border-neutral-700/[0.6] border-2 hover:bg-neutral-900/40 hover:text-white ">
                        <Plus className="mr-2 h-4 w-4" />
                      </Button>

                      <DataTable data={tasks} columns={columnsList} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
          
            </Accordion>
          </div>
        );})}
    </div>
  );
}
