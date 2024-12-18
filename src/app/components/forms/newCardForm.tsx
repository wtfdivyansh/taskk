"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useEffect, useState } from "react";
import { DatePicker } from "../DatePicker";
import { useCardModalStore } from "@/hooks/use-modal-store";
import { Spinner } from "../Spinner";
import { Textarea } from "@/components/ui/textarea";
import { CreateCard } from "@/actions/CreateCard";
import OurUploadDropzone from "../Upload";
import StatusSelect from "../originui/status-component";
import { useTags } from "@/hooks/use-tags";
import { useAssignee } from "@/hooks/use-assignee";
import AssigneeSelect from "../assignee-select";
import { createTaskSchema } from "@/lib/schema";
import { PriorityEnum } from "@/lib/types";
interface tags {
  label: string;
  value: string;
}
[];

export function NewCardForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, boardId, columnId } = useCardModalStore();
  const { data } = useTags();
  const { data: assignee } = useAssignee(
    boardId
  );

  const form = useForm<z.infer<typeof createTaskSchema>>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      status: PriorityEnum.LOW,
      tags: [],
      assignee: "",
      dueDate: new Date(),
    },
    resolver: zodResolver(createTaskSchema),
  });
  const { watch, setValue } = form;
  const tags = watch("tags");

  const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
    setIsLoading(true);
    try {
      console.log(data);
      await CreateCard(data, boardId, columnId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="overflow-scroll h-fit  scrollbar-thin scrollbar-thumb-neutral-900/30 scrollbar-track-transparent"
      >
        <div className="px-2 flex flex-col gap-y-1 py-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Task title"
                    {...field}
                    className="outline-none ring-0 focus-visible:ring-0 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none border-none focus:border-none placeholder:text-neutral-500 placeholder:text-lg text-gray-300 text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Task Description..."
                    rows={5}
                    {...field}
                    className="outline-none ring-0 focus-visible:ring-0 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none border-none focus:border-none placeholder:text-neutral-600 placeholder:text-lg [resize:none] text-neutral-500 text-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex sm:flex-row gap-y-1 flex-wrap flex-1 gap-x-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <StatusSelect
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-1">
                      <MultipleSelector
                        {...field}
                        options={data?.map((tag: any) => ({
                          label: tag.name,
                          value: tag.name,
                        }))}
                        disabled={false}
                        onChange={(
                          value: { label: string; value: string }[]
                        ) => {
                          if (value.length <= 2) {
                            setValue(
                              "tags",
                              value.map((tag: any) => tag.value),
                              { shouldValidate: true }
                            );
                          } else {
                            setValue(
                              "tags",
                              value.slice(0, 2).map((tag: any) => tag.value),
                              { shouldValidate: true }
                            );
                          }
                        }}
                        value={tags.map((tag: any) => ({
                          label: tag,
                          value: tag,
                        }))}
                        placeholder="Select tags"
                        loadingIndicator="Loading..."
                        hideClearAllButton
                        hidePlaceholderWhenSelected
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AssigneeSelect data={assignee!} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex flex-col items-center justify-center">
                  <OurUploadDropzone
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-center p-1 bg-neutral-900/30 shadow-sm  gap-x-1 border-t border-border text-base">
          <Button
            type="submit"
            className=" rounded-md bg-neutral-900 px-4 py-1 text-sm font-mono text-gray-300 shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10 hover:bg-neutral-800/20 hover:shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)]"
          >
            {isLoading ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              "create"
            )}
          </Button>
          <Button
            variant="destructive"
            type="button"
            className=" rounded-md bg-red-700 px-4 py-1 text-sm font-mono text-gray-300 shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10 hover:bg-red-800/80 hover:shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)]"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
