"use client"
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
import { ArrowUpCircle, CheckCircle2, Info, LucideIcon, XCircle } from "lucide-react";
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
export default function Settings() {
  return (
    <div className="border-l-[1px] border-t-[1px]  h-screen  border-muted-foreground/20 overflow-scroll bg-neutral-900/60 ">
      <div className="flex flex-col gap-y-2 mt-4 border-b-[1px] border-neutral-700/[0.6]  h-fit">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-normal text-neutral-300 px-6">
            Settings
          </h1>
        </div>
      </div>
      <div className=" w-full p-4 space-y-8">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">General</h2>
          <p className="text-muted-foreground">
            Settings and options for your application.
          </p>
        </div> */}

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
                    className="bg-[#0f6fff] hover:bg-[#0f6fff]/80 text-md text-neutral-300 "
                  >
                    save
                  </Button>
                  <Button>Cancel</Button>
                </div>
              </div>
              <Separator className="opacity-40" />
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-y-2 gap-x-1 ">
                  <div className="flex flex-col gap-1 sm:w-1/3 ">
                    <Label htmlFor="name">Name</Label>
                    <p className="text-sm text-muted-foreground">
                      Changes will update all tasks.
                    </p>
                  </div>
                  <Input id="name" className=" w-80" defaultValue="taskk AI" />
                </div>
              </div>
              <Separator className="opacity-40" />

              <div className="space-y-2 flex flex-col sm:flex-row gap-x-1 ">
                <div className="flex flex-col sm:w-1/3">
                  <Label>Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Changes will update the project.
                  </p>
                </div>
                <Select defaultValue="done">
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
                            className={cn(" h-5 w-5 ", status.className)}
                          />
                          <p>{status.label}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="opacity-40" />

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
                    className="min-h-[100px] [resize:none] w-80"
                    defaultValue="Untitled UI is the ultimate Figma UI kit and design system to kickstart any project, startup, or freelance designer."
                  />
                  <div className="text-sm text-muted-foreground">
                    40 characters max
                  </div>
                </div>
              </div>
              <Separator className="opacity-40" />

              <div className="space-y-2 flex flex-col sm:flex-row  gap-x-1">
                <div className="flex flex-col sm:w-1/3">
                  <Label htmlFor="tagline">Due Date</Label>
                  <p className="text-sm text-muted-foreground">
                    Due Date for your project.
                  </p>
                </div>
                <div className=" flex flex-col ">
                 <DatePicker className="w-80" value={new Date()} onChange={(value:Date) => console.log(value)} disabled={true} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
