"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CalendarCheckIcon,
  Info,
  NotepadText,
  PlusIcon,
  Tags,
  User2,
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
import { PriorityEnum, Task } from "@/lib/types";
import { useAssignee } from "@/hooks/use-assignee";
import { useBoardParams } from "@/hooks/use-boardParams";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { updateTaskSchema } from "@/lib/schema";
interface editTaskProps {
  task: Task;
}

export function EditTask({ task }: editTaskProps) {

  const boardId = useBoardParams();
  const { data } = useAssignee(boardId.toString())
 const initialValues = {
   title: task.title,
   description: task.description ?? "",
   status: task.priority as PriorityEnum, 
   tags: [],
   dueDate: task.dueDate,
   assignee: task.assignee?.id ?? "",
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
  console.log("after", data);
};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      {...field}
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className=" flex flex-row w-full gap-x-1 ">
                      <Info className=" text-neutral-500  size-6"></Info>
                      <p className="text-md text-neutral-500 text-justify w-24 ">
                        Priority{" "}
                      </p>
                      <StatusSelect
                      
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
                        <DatePicker value={field.value} onChange={field.onChange} />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className=" flex flex-row w-full gap-x-1 item-center ">
                      <User2 className=" text-neutral-500  size-6"></User2>
                      <p className="text-md text-neutral-500 text-justify w-24 ">
                        Assignee{" "}
                      </p>
                      <AssigneeSelect
                        data={data || []}
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
                        {task.tags.length < 2 && (
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
                      placeholder="add a description to your task"
                      rows={2}
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
        <Button type="submit">save</Button >
      </form>
    </Form>
  );
}
