"use client"
import Subtasks from "@/app/(main)/tasks/[taskId]/_components/subtasks";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
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
import { BookDashed, CalendarCheckIcon, CalendarRange, Delete, DeleteIcon, Edit, Info, NotepadText, PlusIcon, Tags, Trash, Trash2, User2, X } from "lucide-react";
import { RxDotsVertical } from "react-icons/rx";
import CommentButton from "../comment/comment-button";
import CommentBox from "../comment/comment-box";
import AttachmentBox from "../attachment/attachment-box";
import { useState } from "react";
import StatusSelect from "../originui/status-component";
import { DatePicker } from "../DatePicker";
import { useBoardParams } from "@/hooks/use-boardParams";
import { useAssignee } from "@/hooks/use-assignee";
import AssigneeSelect from "../assignee-select";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { EditTask } from "../forms/editTask";

type props ={
    children:React.ReactNode
    task: Task
}
export const TaskSheet: React.FC<props> = ({ children, task }) => {
  const [taskData, settaskData] = useState<any>({});
  const [canEdit, setCanEdit] = useState(false);
  const boardId = useBoardParams();
  const {data}=useAssignee(boardId.toString())

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className=" min-w-[500px] p-0 h-full">
        <SheetHeader className="w-full border-b border-neutral-700/[0.4] flex flex-row items-center justify-between h-12">
          <SheetClose className="px-4 mt-1 ">
            <X className="hover:text-white text-neutral-600 size-6" />
          </SheetClose>
          <div className="flex flex-row px-5 gap-x-1 items-center justify-center ">
            <Edit
              className={cn(
                "size-5 hover:text-white text-neutral-600 cursor-pointer",
                canEdit && " text-green-500 hover:text-green-500/90"
              )}
              onClick={() => setCanEdit((prev) => !prev)}
            />
            <RxDotsVertical className="size-5 hover:text-white text-neutral-600 cursor-pointer" />
            <Trash2 className="size-5 hover:text-red-300 text-neutral-600 cursor-pointer" />
          </div>
        </SheetHeader>
        <div className="px-4  flex flex-col  h-full ">
         <EditTask task={task}/>
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
}
