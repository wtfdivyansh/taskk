"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert, PlusIcon } from "lucide-react";
import { useState } from "react";
import TagSelect from "../originui/multi-select";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTags, useTaskTags } from "@/hooks/use-tags";
import MultipleSelector from "@/components/ui/multiselect";

export const addTaskSchema = z.object({
  tags: z.string().array().max(2, {message: "You can only add 2 tags"}),
});
export default function AddTaskTag({taskId}:{taskId:string}) {
  const {data:tags,mutate,isPending} = useTaskTags(taskId)
  const tagLength = tags?.count === 0 ? 2 : 1;
  const form = useForm<z.infer<typeof addTaskSchema>>({
    defaultValues: {
      tags:[],
    },
    resolver: zodResolver(addTaskSchema),
  });
  const SelectedTags = form.watch("tags");
  const handleSubmit = async (data: z.infer<typeof addTaskSchema>) => {
    mutate({data})
    console.log(data)
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-x-1 h-fit w-fit items-center border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-1 ">
          <PlusIcon className="text-neutral-500 hover:text-neutral-300 cursor-pointer h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Add Tag to task
            </DialogTitle>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="space-y-2">
              <Label htmlFor="project-name">Tags</Label>
              <div className="space-y-1">
                <MultipleSelector
                  options={tags?.data?.map((tag: any) => ({
                    label: tag,
                    value: tag,
                  }))}
                  disabled={false}
                  onChange={(value: { label: string; value: string }[]) => {
                    if (value.length <= tagLength) {
                      form.setValue(
                        "tags",
                        value.map((tag: any) => tag.value),
                        { shouldValidate: true }
                      );
                    } else {
                      form.setValue(
                        "tags",
                        value.slice(0, tagLength).map((tag: any) => tag.value),
                        { shouldValidate: true }
                      );
                    }
                  }}
                  value={SelectedTags.map((tag: any) => ({
                    label: tag,
                    value: tag,
                  }))}
                  placeholder="Select tags"
                  loadingIndicator="Loading..."
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="flex-1">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
