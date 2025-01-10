"use client";
import { DatePicker } from "@/app/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpCircle,
  CheckCircle2,
  LucideIcon,
  XCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
  className?: string;
};
const statuses: Status[] = [
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
    className: "text-blue-400",
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
    className: "text-emerald-400",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
    className: "text-rose-400",
  },
];
export const SettingsFormSchema = z.object({
  name: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  dueDate: z.coerce.date().optional(),
});
interface SettingsFormProps {
  initialSettings: {
    name: string;
    thumbnail: string | null;
    status: string;
    description: string | null;
    targetDate: Date;
  }
}
export default function SettingsForm({initialSettings}:SettingsFormProps) {

  const form = useForm<z.infer<typeof SettingsFormSchema>>({
    defaultValues: {
      name: initialSettings?.name,
      icon: initialSettings?.thumbnail ?? " ",
      status: initialSettings?.status,
      description: initialSettings?.description ?? " ",
      dueDate: initialSettings?.targetDate,
    },
    resolver: zodResolver(SettingsFormSchema),
  });
    const { formState } = form;
    const { isDirty } = formState;

  const onSubmit = async (data: z.infer<typeof SettingsFormSchema>) => {
    console.log(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6 bg-muted/20">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row  gap-x-2  justify-between ">
                <div className="flex flex-col">
                  <p className="font-lg">General Settings</p>
                  <p className="text-sm text-muted-foreground">
                    Settings and options for your application.
                  </p>
                </div>
                <div className="flex gap-2  items-end justify-end ">
                  <Button
                    variant="outline"
                    type="submit"
                    className="bg-[#0f6fff] hover:bg-[#0f6fff]/80 text-md text-neutral-300 "
                    disabled={!isDirty}
                  >
                    save
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-500 text-neutral-200" disabled={!isDirty} onClick={()=>{
                    form.reset()
                  }}>Discard</Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-y-2 gap-x-1 ">
                          <div className="flex flex-col gap-1 sm:w-1/3 ">
                            <Label htmlFor="name">Icon</Label>
                            <p className="text-sm text-muted-foreground">
                              Changes will update all tasks.
                            </p>
                          </div>
                          <img
                            src="https://github.com/shadcn.png"
                            alt="github"
                            width={50}
                            height={50}
                            className="border board-neutral-900/[0.2] rounded-md "
                          />
                          <Button
                            variant={"ghost"}
                            className="bg-neutral-900/30 text-neutral-400 border border-neutral-900/[0.9] rounded-md "
                          >
                            Change avatar
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="opacity-40" />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-y-2 gap-x-1 ">
                          <div className="flex flex-col gap-1 sm:w-1/3 ">
                            <Label htmlFor="name">Name</Label>
                            <p className="text-sm text-muted-foreground">
                              Changes will update all tasks.
                            </p>
                          </div>
                          <Input
                            id="name"
                            className=" w-80"
                            {...field}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="opacity-40" />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2 flex flex-col sm:flex-row gap-x-1 ">
                        <div className="flex flex-col sm:w-1/3">
                          <Label>Status</Label>
                          <p className="text-sm text-muted-foreground">
                            Changes will update the project.
                          </p>
                        </div>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-80">
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                                className="w-full"
                              >
                                <div className="flex flex-row w-full items-center gap-x-3">
                                  <status.icon
                                    className={cn(
                                      " h-5 w-5 ",
                                      status.className
                                    )}
                                  />
                                  <p>{status.label}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="opacity-40" />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2 flex flex-col sm:flex-row  gap-x-1">
                        <div className="flex flex-col sm:w-1/3">
                          <Label htmlFor="tagline">Description</Label>
                          <p className="text-sm text-muted-foreground">
                            A quick snapshot of your application.
                          </p>
                        </div>
                        <div className=" flex flex-col ">
                          <Textarea
                            id="tagline"
                            rows={3}
                            placeholder="Short description of your project"
                            className="min-h-[100px] [resize:none] w-80"
                            {...field}
                          />
                          <div className="text-sm text-muted-foreground">
                            40 characters max
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="opacity-40" />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2 flex flex-col sm:flex-row  gap-x-1">
                        <div className="flex flex-col sm:w-1/3">
                          <Label htmlFor="tagline">Due Date</Label>
                          <p className="text-sm text-muted-foreground">
                            Due Date for your project.
                          </p>
                        </div>
                        <div className=" flex flex-col ">
                          <DatePicker
                            className="w-80"
                            value={field.value ?? new Date()}
                            onChange={field.onChange}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
