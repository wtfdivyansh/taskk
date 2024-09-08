"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";


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
import { boardModalStore, cateogaryModalStore } from "@/hooks/use-modal-store";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { colors } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createList } from "@/actions/createList";
import { Spinner } from "../Spinner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  color:z.string()
});

export function ListForm() {
  
  const [isLoading, setIsLoading] = useState(false);
  const { onClose,boardId } = boardModalStore();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      color:""
    },
    resolver: zodResolver(formSchema),
  });


  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
       await createList(data.name, data.color,boardId);
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      onClose();
    }
    
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
                  placeholder="eg-todo"
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
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose a color</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange}>
                  <div className="flex items-center space-x-2">
                    {colors.map((color) => (
                      <RadioGroupItem
                        key={color.label}
                        value={color.value}
                        className={cn(
                          "relative -m-0.5 gap-x-1 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                          {
                            [`bg-${color.value}`]: true,
                          }
                        )}
                      ></RadioGroupItem>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-start gap-x-1">
          <Button type="submit">
            {isLoading? (
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
