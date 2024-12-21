"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CalendarCheckIcon,
  Edit,
  Info,
  NotepadText,
  PlusIcon,
  SaveIcon,
  Tags,
  Trash2,
  User2,
  X,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import StatusSelect from "../originui/status-component";
import { DatePicker } from "../DatePicker";
import AssigneeSelect from "../assignee-select";
import { Textarea } from "@/components/ui/textarea";
import { priority, PriorityEnum, Task } from "@/lib/types";
import { useAssignee } from "@/hooks/use-assignee";
import { useBoardParams } from "@/hooks/use-boardParams";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { updateTaskSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetHeader } from "@/components/ui/sheet";
import { RxDotsVertical } from "react-icons/rx";
import { useEditTask, useGetSingleTask } from "@/hooks/use-get-tasks";
interface editTaskProps {
  task: Omit<Task,"color">
}
export function EditTask({ task }: editTaskProps) {
  const [taskData, setTaskData] = useState<Omit<Task, "color">>(task);
  const [canEdit, setCanEdit] = useState(false);
 const boardId = useBoardParams();
 const { data:assignee } = useAssignee(boardId.toString())
 const {data}= useGetSingleTask(task.id)
 const { mutateAsync, isPending } = useEditTask(boardId.toString());
 const initialValues = {
   title: taskData.title,
   description: taskData.description ?? "",
   priority: taskData.priority as PriorityEnum,
   tags: [],
   dueDate: taskData.dueDate,
   assigneeId: taskData.assignee.id,
 };
  const form = useForm<z.infer<typeof updateTaskSchema>>({
    defaultValues: initialValues,
    resolver: zodResolver(updateTaskSchema),
  });
const handleSubmit = async (data: z.infer<typeof updateTaskSchema>) => {
  for (const key in data) {
    if ((data as any)[key] == (initialValues as any)[key]) {
      delete (data as any)[key];
    }
    if (key == "dueDate") {
      data[key].toISOString() === initialValues[key].toISOString()
        ? delete (data as any)[key]
        : data[key];
    }
    if (key == "tags") {
      data[key].length === initialValues[key].length
        ? delete (data as any)[key]
        : data[key];
    }
  }
  try{
   await mutateAsync({taskId:task.id,data})
    setCanEdit(false)
  }catch(e){
    console.log(e);
  }

};
useEffect(()=>{
   if (canEdit ===false) {
     form.reset(initialValues);
   }
},[canEdit])
useEffect(()=>{
  setTaskData(task)
},[])
useEffect(() => {
  if (data) {
    const taskData: Omit<Task, "color"> = {
      ...data,
      priority: data.priority as PriorityEnum,
    };
    setTaskData(taskData);
  }
}, [data]);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-0">
          <div className="p-0">
            <SheetHeader className="w-full border-b border-neutral-700/[0.4] flex flex-row items-center justify-between h-12">
              <SheetClose className="px-4 mt-1 ">
                <X className="hover:text-white text-neutral-600 size-6" />
              </SheetClose>
              <div className="flex flex-row px-5 gap-x-1 items-center justify-center ">
                {canEdit && (
                  <Button
                    type="submit"
                    className="bg-sky-500 hover:bg-skey-500/80 border border-blue-700/[0.5] text-gray-200 rounded-md h-8 w-fit p-2"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "save"}
                  </Button>
                )}
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
          </div>
          <div className="flex flex-col gap-y-3   px-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input
                        {...field}
                        disabled={!canEdit}
                        placeholder="Task title"
                        className="outline-none ring-0 focus-visible:ring-0 focus:oultine-none focus:stroke-none border-none focus:border-none focus:visible:ring-0 focus:visible:ring-neutral-900 focus:visible:outline-none placeholder:text-neutral-500 placeholder:text-lg text-gray-300 text-lg text-start p-0 focus-visible:border-none"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className=" flex flex-row w-full gap-x-1 ">
                        <Info className=" text-neutral-500  size-6"></Info>
                        <p className="text-md text-neutral-500 text-justify w-24 ">
                          Priority{" "}
                        </p>
                        <StatusSelect
                          disabled={!canEdit}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className=" flex flex-row w-full gap-x-1 item-center ">
                        <CalendarCheckIcon className=" text-neutral-500  size-6"></CalendarCheckIcon>
                        <p className="text-md text-neutral-500 text-justify w-24">
                          Due date
                        </p>
                        <div className="flex items-center">
                          <DatePicker
                            disabled={canEdit}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className=" flex flex-row w-full gap-x-1 item-center ">
                        <User2 className=" text-neutral-500  size-6"></User2>
                        <p className="text-md text-neutral-500 text-justify w-24 ">
                          Assignee{" "}
                        </p>
                        <AssigneeSelect
                          disabled={!canEdit}
                          data={assignee || []}
                          defaultValue={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className=" flex flex-row w-full gap-x-1 item-center ">
                        <Tags className=" text-neutral-500  size-6"></Tags>
                        <p className="text-md text-neutral-500 text-justify w-24 ">
                          Tags{" "}
                        </p>
                        <div className="flex flex-row gap-x-1 items-center ">
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
                          {task.tags.length < 2 && canEdit && (
                            <div className="flex flex-row gap-x-1 h-fit w-fit items-center border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-1 ">
                              <PlusIcon className="text-neutral-500 hover:text-neutral-300 cursor-pointer h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className=" flex flex-col w-full gap-y-2 item-center ">
                      <div className="flex flex-row gap-x-1 ">
                        <NotepadText className=" text-neutral-500  size-6"></NotepadText>
                        <p className="text-md text-neutral-500 text-justify ">
                          Description{" "}
                        </p>
                      </div>
                      <Textarea
                        disabled={!canEdit}
                        placeholder="add a description to your task"
                        rows={1}
                        value={field.value}
                        onChange={field.onChange}
                        className="outline-none ring-1 ring-neutral-700/[0.2] focus-visible:ring-0 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none border-none focus:border-none placeholder:text-neutral-600 placeholder:text-md [resize:none] text-neutral-500 text-md border border-neutral-700/[0.2] bg-neutral-900/70"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
