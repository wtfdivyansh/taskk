"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { cateogaryModalStore } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function TagForm() {
    const {onClose}= cateogaryModalStore()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationFn: async(data: z.infer<typeof formSchema>) => {
      const res = await axios.post("/api/tags", data);
      return res.data;
    },
    onSuccess: async(data) => {

        await queryClient.invalidateQueries({queryKey: ["tags"]});
        onClose();
    },
  });


  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg-Ui Design"
                  {...field}
                  className="outline-none ring-0 focus-visible:ring-1 focus-visible:ring-neutral-900 focus:oultine-none focus:stroke-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-xol gap-x-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
