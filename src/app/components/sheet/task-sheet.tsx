"use client"
import Subtasks from "@/app/(main)/tasks/[taskId]/_components/subtasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,

  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Task} from "@/lib/types";
import { cn } from "@/lib/utils";
import {  Edit, Trash2, X } from "lucide-react";
import { RxDotsVertical } from "react-icons/rx";
import CommentButton from "../comment/comment-button";
import CommentBox from "../comment/comment-box";
import AttachmentBox from "../attachment/attachment-box";
import { useState } from "react";
import { useBoardParams } from "@/hooks/use-boardParams";
import { EditTask } from "../forms/editTask";
import { Button } from "@/components/ui/button";

type props ={
    children:React.ReactNode
    task: Task
}
export const TaskSheet: React.FC<props> = ({ children, task }) => {

  
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className=" min-w-[500px] p-0 h-full">
        <div className="  flex flex-col  h-full ">
          <EditTask task={task}  />
          <div className="px-4">
            <Tabs defaultValue="Subtasks" className="w-full h-full">
              <TabsList className="grid grid-cols-3 gap-x-2 items-start justify-around bg-transparent">
                <TabsTrigger
                  value="Subtasks"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-neutral-300 data-[state=active]:border-b-4 data-[state=active]:border-blue-500 data-[state=active]:shadow-none text-neutral-600   "
                >
                  Subtasks
                </TabsTrigger>
                <TabsTrigger
                  value="Comments"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-neutral-300  data-[state=active]:border-b-4 data-[state=active]:border-blue-500 data-[state=active]:shadow-none text-neutral-600"
                >
                  Comments
                </TabsTrigger>

                <TabsTrigger
                  value="Attachments"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-neutral-300  data-[state=active]:border-b-4 data-[state=active]:border-blue-500 data-[state=active]:shadow-none text-neutral-600"
                >
                  Attachments
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Subtasks" className="w-full h-full">
                <ScrollArea className="w-full h-full">
                  <Subtasks taskId={task.id} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="Comments">
                <ScrollArea className="w-full h-full">
                  <CommentBox taskId={task.id} />
                  <CommentButton taskId={task.id} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="Attachments">
                <ScrollArea className="w-full h-full">
                  <AttachmentBox taskId={task.id} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
