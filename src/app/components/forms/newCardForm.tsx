"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multi";
import { useEffect, useState } from "react";
import { DatePicker } from "../DatePicker";
import { useCardModalStore } from "@/hooks/use-modal-store";
import { Spinner } from "../Spinner";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateCard } from "@/actions/CreateCard";
import OurUploadDropzone from "../Upload";
import StatusSelect from "../originui/status-component";
import TagSelect from "../originui/multi-select";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.optional(z.string().min(0)),
  image: z.string().optional(),
  status: z.enum(["low", "medium", "high"]),
  tags: z.string().array().min(0),
  dueDate: z.date(),
});
interface tags {
  label: string;
  value: string;
}
[];

export function NewCardForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, boardId, columnId } = useCardModalStore();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      status: "low",
      tags: [],
      dueDate: new Date(),
    },
    resolver: zodResolver(formSchema),
  });
  const { watch, setValue } = form;
  const tags = watch("tags");
  const status = watch("status");
  

  const query = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get("/api/tags");
      return res.data;
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await CreateCard(data, boardId, columnId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  useEffect(()=>{
    console.log(tags)
  },[tags])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1 overflow-scroll h-[600px] scrollbar-thin scrollbar-thumb-neutral-900/30 scrollbar-track-transparent"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Task title"
                  {...field}
                  className="outline-none ring-0 focus-visible:ring-0 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none border-none focus:border-none placeholder:text-neutral-500 placeholder:text-lg text-gray-400 text-lg"
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
                  className="outline-none ring-0 focus-visible:ring-0 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none border-none focus:border-none placeholder:text-neutral-600 placeholder:text-lg [resize:none]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image(optional)</FormLabel>
              <FormControl className="flex flex-col items-center justify-center">
                <OurUploadDropzone
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                This is your project display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority</FormLabel>
              <FormControl>
               <StatusSelect  defaultValue={field.value} onValueChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex  gap-x-2">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  {/* <MultipleSelector
                    options={query.data?.map((tag: any) => ({
                      label: tag.name,
                      value: tag.name,
                    }))}
                    disabled={false}
                    onChange={(value: { label: string; value: string }[]) => {
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
                    placeholder="eg-tech"
                    loadingIndicator="Loading..."
                    emptyIndicator="No tags selected"
                  /> */}
                  <TagSelect onChange={field.onChange} SelectedTags={tags} />
                </FormControl>
                <FormDescription>
                  Tags are used to categorize your projects.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-x-1">
          <Button type="submit">
            {isLoading ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="destructive">Cancel</Button>
        </div>
      </form>
    </Form>
  );
}
