"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field } from "@clerk/elements/common";


export function DatePicker({value, onChange,...props}: any) {
 

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
         disabled={!props.disabled}
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" >
        <Calendar
          mode="single"
          selected={value.toString()}
          onSelect={onChange}
          initialFocus
        />
        <input type="hidden" name={props.name} value={value.toString()} />
      </PopoverContent>
    </Popover>
  );
}
