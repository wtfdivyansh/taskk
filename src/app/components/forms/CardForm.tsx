"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import { Shojumaru } from "next/font/google";
import { ComboboxPopover } from "../Status";
import { DatePicker } from "../DatePicker";
import { CreateProject } from "@/actions/CreateProject";
import { useCardModalStore, useModalStore } from "@/hooks/use-modal-store";
import { Spinner } from "../Spinner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateCard } from "@/actions/CreateCard";
import OurUploadDropzone from "../Upload";

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

export function CardForm() {
const [isLoading,setIsLoading] = useState(false)
  const { onClose,boardId,columnId } = useCardModalStore();
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
    
     await CreateCard(data,boardId,columnId);
   } catch (error) {
     console.log(error);
   } finally {
     setIsLoading(false);
     onClose();
   }
 };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-scroll h-[600px] scrollbar-thin scrollbar-thumb-neutral-900/30 scrollbar-track-transparent">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg:my-project"
                  {...field}
                  className="outline-none ring-0 focus-visible:ring-1 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none"
                />
              </FormControl>
              <FormDescription>
                This is your project display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description(optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add description to your project"
                  rows={5}
                  {...field}
                  className="outline-none ring-0 focus-visible:ring-1 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image(optional)</FormLabel>
              <FormControl className="flex flex-col items-center justify-center">
               <OurUploadDropzone onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormDescription>
                This is your project display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex flex-row gap-x-2">
                    <FormItem className="flex  justify-center items-center space-x-3 space-y-0 border border-neutral-700/[0.3] w-fit p-4 h-8 rounded-lg bg-sky-500 ">
                      <FormControl>
                        <RadioGroupItem value="low" />
                      </FormControl>
                      <FormLabel className="font-normal">Low</FormLabel>
                    </FormItem>
                    <FormItem className="flex  justify-center items-center space-x-3 space-y-0 border border-neutral-700/[0.3] w-fit p-4 h-8 rounded-lg bg-yellow-500">
                      <FormControl>
                        <RadioGroupItem value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal">Medium</FormLabel>
                    </FormItem>
                    <FormItem className="flex  justify-center items-center space-x-3 space-y-0 border border-neutral-700/[0.3] w-fit p-4 h-8 rounded-lg bg-red-500">
                      <FormControl>
                        <RadioGroupItem value="high" />
                      </FormControl>
                      <FormLabel className="font-normal">High</FormLabel>
                    </FormItem>
                  </div>
                </RadioGroup>
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
                  <MultipleSelector
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
                  />
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
