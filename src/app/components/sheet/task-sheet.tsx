"use client"
import Subtasks from "@/app/(main)/tasks/[taskId]/_components/subtasks";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Task, TaskProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BookDashed, CalendarCheckIcon, CalendarRange, Delete, DeleteIcon, Edit, Info, NotepadText, Tags, Trash, Trash2, User2, X } from "lucide-react";
import { RxDotsVertical } from "react-icons/rx";
import CommentButton from "../comment/comment-button";
import CommentBox from "../comment/comment-box";
import AttachmentBox from "../attachment/attachment-box";
import AttachmentButton from "../attachment/attachment-button";
type props ={
    children:React.ReactNode
    task: Task
}
export const TaskSheet: React.FC<props> = ({ children, task }) => (
  <Sheet>
    <SheetTrigger>{children}</SheetTrigger>
    <SheetContent className=" min-w-[500px] p-0 h-full">
      <SheetHeader className="w-full border-b border-neutral-700/[0.4] flex flex-row items-center justify-between h-12">
        <SheetClose className="px-4 mt-1 ">
          <X className="hover:text-white text-neutral-600 size-6" />
        </SheetClose>
        <div className="flex flex-row px-5 gap-x-1 items-center justify-center ">
          <Edit className="size-5 hover:text-white text-neutral-600 cursor-pointer" />
          <RxDotsVertical className="size-5 hover:text-white text-neutral-600 cursor-pointer" />
          <Trash2 className="size-5 hover:text-red-300 text-neutral-600 cursor-pointer" />
        </div>
      </SheetHeader>
      <div className="p-4 flex flex-col space-y-6 h-full ">
        <h1 className="text-2xl text-white">{task.title}</h1>
        <div className="flex flex-col gap-y-6">
          <div className=" flex flex-row w-full gap-x-1 item-center ">
            <Info className=" text-neutral-500  size-6"></Info>
            <p className="text-md text-neutral-500 text-justify ">Priority </p>
            <Badge
              className={cn(
                "text-xs  bg-sky-500/40 text-sky-500 ring-1/[0.5] ring-white  mx-16",
                {
                  "bg-emerald-500/40 text-emerald-500":
                    task.priority === "high",
                  "bg-red-500/40 text-red-500": task.priority === "low",
                  "bg-sky-500/40 text-sky-500": task.priority === "medium",
                }
              )}
            >
              {task.priority}
            </Badge>
          </div>
          <div className=" flex flex-row w-full gap-x-1 item-center ">
            <CalendarCheckIcon className=" text-neutral-500  size-6"></CalendarCheckIcon>
            <p className="text-md text-neutral-500 text-justify ">Due date</p>
            <div className="flex items-center mx-12">
              {task.dueDate && (
                <p className="text-sm text-neutral-300">
                  {format(task?.dueDate, "dd MMMM yyyy")}
                </p>
              )}
            </div>
          </div>
          <div className=" flex flex-row w-full gap-x-1 item-center ">
            <User2 className=" text-neutral-500  size-6"></User2>
            <p className="text-md text-neutral-500 text-justify ">Assignee </p>
          </div>
          <div className=" flex flex-row w-full gap-x-1 item-center ">
            <Tags className=" text-neutral-500  size-6"></Tags>
            <p className="text-md text-neutral-500 text-justify ">Tags </p>
            <div>
              {task.tags.map((t, index) => (
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
            </div>
          </div>
          {task.content ? (
            <div className=" flex flex-col w-full gap-y-2 item-center ">
              <div className="flex flex-row gap-x-1 ">
                <NotepadText className=" text-neutral-500  size-6"></NotepadText>
                <p className="text-md text-neutral-500 text-justify ">
                  Description{" "}
                </p>
              </div>
              {task.content && (
                <div className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-row items-start max-h-16 h-16 ">
                  <p className="text-neutral-500 text-sm text-wrap">
                    {task.content}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className=" flex flex-col w-full gap-y-2 item-center ">
              <div className="flex flex-row gap-x-1 ">
                <NotepadText className=" text-neutral-500  size-6"></NotepadText>
                <p className="text-md text-neutral-500 text-justify ">
                  Description{" "}
                </p>
              </div>

              <div className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-row items-start max-h-16 h-16 ">
                <p className="text-neutral-600 text-sm text-wrap">
                  Add a description to your task
                </p>
              </div>
            </div>
          )}
        </div>
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
    </SheetContent>
  </Sheet>
);
