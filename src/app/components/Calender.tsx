"use client";

import { Badge } from "@/components/ui/badge";
import { TaskColor, TaskProps, Todo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { addMonths, addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, getMonth, isToday, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
import {  ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { useState } from "react";
import { RiProgress4Line } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Months from "./Calendar/Months";
import Weeks from "./Calendar/Weeks";

const days =[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
interface CalenderProps {
  tasks: TaskColor[];
}
export default function Calender({tasks}:CalenderProps) {
     const currentDate = new Date();
    const [month,setCurrentMonth] = useState(currentDate);
    const [type,setType] = useState("month");

  
    const handlePreviousMonth = () => {
        if(type === "month"){
          setCurrentMonth(subMonths(month, 1));
        }
        if(type === "week"){
          setCurrentMonth(subWeeks(month, 1));
        }
     
    }
    const handleNextMonth = () => {
        if(type === "month"){
          setCurrentMonth(addMonths(month, 1));
        }
        if(type === "week"){
          setCurrentMonth(addWeeks(month, 1));
        }

    }
    const StartOfWeek= startOfWeek(month);
    const EndOfWeek = endOfWeek(month);
    const handleToday = () => {
      setCurrentMonth(new Date());
    }
    
  return (
    <div className="w-full px-2 bg-neutral-950 mx-auto rounded-lg py-2">
      <Tabs defaultValue="month" className="w-full">
        <div className="flex flex-row items-center justify-between gap-x-2">
          <div className="flex flex-row ">
            <div className="flex flex-row gap-x-1">
              <div
                onClick={handlePreviousMonth}
                className="cursor-pointer p-1 border border-neutral-700/[0.2] bg-neutral-900/30 rounded-lg"
              >
                <ChevronLeft />
              </div>
              <div
                className="cursor-pointer p-1 border border-neutral-700/[0.2] bg-neutral-900/30 rounded-lg"
                onClick={handleToday}
              >
                <span>Today</span>
              </div>
              <div
                onClick={handleNextMonth}
                className="cursor-pointer p-1 border border-neutral-700/[0.2] bg-neutral-900/30 rounded-lg"
              >
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center p-4 border-neutral-700/[0.2] bg-neutral-900/30 rounded-lg border ">
            <h1>
              {type === "month"
                ? format(month, "MMMM yyyy")
                : `${format(StartOfWeek, "dd MMMM")} - ${format(
                    EndOfWeek,
                    "dd MMMM"
                  )}`}
            </h1>
          </div>

          <TabsList>
            <TabsTrigger
              value="month"
              onClick={() => {
                setType("month");
              }}
            >
              Month
            </TabsTrigger>
            <TabsTrigger
              value="week"
              onClick={() => {
                setType("week");
              }}
            >
              Week
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="month">
          <Months
            month={month}
            setCurrentMonth={setCurrentMonth}
            tasks={tasks}
          />
        </TabsContent>
        <TabsContent value="week">
          <Weeks Week={month} setCurrentMonth={setCurrentMonth} tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
