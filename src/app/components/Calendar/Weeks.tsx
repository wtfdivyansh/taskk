import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskColor } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  addHours,
  differenceInMinutes,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfWeek,
  format,
  getHours,
  isSameDay,
  isSameHour,
  isToday,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfHour,
  startOfWeek,
} from "date-fns";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface WeekProps {
  Week: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  tasks: TaskColor[];
}


export default function Weeks({ Week, setCurrentMonth, tasks }: WeekProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const currentDate = new Date();
  const StartOfWeek = startOfWeek(Week);
  const EndOfWeek = endOfWeek(Week);
  const DaysInWeek = eachDayOfInterval({
    start: StartOfWeek,
    end: EndOfWeek,
  });
  const start = startOfDay(currentDate);
  const end = endOfDay(currentDate);
  const Hours = eachHourOfInterval({
    start: start,
    end: end,
  });
  const WeekHours = eachDayOfInterval({
    start: StartOfWeek,
    end: EndOfWeek,
  }).map((day) => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);
    return eachHourOfInterval({ start: dayStart, end: dayEnd });
  });

  useEffect(() => {
    setCurrentMonth(Week);
  }, [Week]);
  useEffect(() => {
    console.log(Hours)
  }, [Hours]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".task-item")) {
        setSelectedTaskId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row overflow-scroll">
      <div className="flex flex-col border border-neutral-700/[0.15] bg-neutral-900/20 w-full rounded-lg">
        <div className="flex-1 grid grid-cols-7 ml-36 h-24 mt-4   rounded-md mx-auto px-2 py-2 gap-x-3  ">
          
          {DaysInWeek.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center  w-36 h-20  bg-neutral-900/30 rounded-2xl border border-neutral-700/[0.2] "
            >
              <span className="text-md text-neutral-500">
                {format(day, "EE ")}
              </span>
              <span
                className={cn("text-md text-neutral-500", {
                  "h-6 w-6 items-center p-1 justify-center rounded-full text-emerald-500":
                    isToday(day),
                })}
              >
                {format(day, "dd")}
              </span>
            </div>
          ))}
        </div>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="grid grid-cols-8 mt-2 overflow-scroll">
            <div className="w-28 h-full">
              {Hours.map((hour, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start  h-36 w-36"
                >
                  <span className="text-md text-neutral-500">
                    {format(hour, "HH:mm")}
                  </span>
                </div>
              ))}
            </div>
            {WeekHours.map((dayHours, dayIndex) => (
              <div
                key={dayIndex}
                className="h-full w-full border border-neutral-700/[0.15] bg-[#0b0b0b] overflow-visible"
              >
                {dayHours.map((hour, hourIndex) => (
                  <div
                    key={hourIndex}
                    className="h-36  overflow-hidden relative z-10"
                  >
                    {tasks
                      .filter((task) => {
                        if (!task.dueDate) return false;
                        const taskDate = new Date(task.dueDate);
                        const taskStart = task.startTime
                          ? new Date(task.startTime)
                          : taskDate;
                        const taskEnd = task.endTime
                          ? new Date(task.endTime)
                          : addHours(taskDate, 1);
                        return (
                          isSameDay(taskStart, dayHours[0]) &&
                          isWithinInterval(hour, {
                            start: startOfHour(taskStart),
                            end: endOfDay(taskEnd),
                          })
                        );
                      })
                      .map((task, taskIndex) => {
                        if (!task.dueDate) return null;
                        const taskStart = task.startTime
                          ? new Date(task.startTime)
                          : new Date(task.dueDate);
                        const taskEnd = task.endTime
                          ? new Date(task.endTime)
                          : addHours(new Date(task.dueDate), 1);
                        const hourStart = startOfHour(hour);
                        const startMinutes = differenceInMinutes(
                          taskStart,
                          hourStart
                        );
                        const duration = differenceInMinutes(
                          taskEnd,
                          taskStart
                        );
                        const topPosition = (startMinutes / 60) * 100;
                        const height = (duration / 60) * 100;

                        return (
                          <div
                            key={taskIndex}
                            className={cn(
                              `flex flex-row gap-x-1 w-36 rounded-sm mx-1  border-neutral-700/[0.2] border absolute  bg-neutral-900/90  shawdow-lg cursor-pointer`
                            )}
                            style={{
                              top: `${topPosition}%`,
                              height: `${height}%`,
                              minHeight: "10%",
                              zIndex: selectedTaskId === task.id ? 999 : 10,

                              left: "0px" + taskIndex,
                              
                            }}
                            onClick={() => {
                              setSelectedTaskId(task.id);
                            }}
                          >
                            <span
                              className={cn(
                                `bg-${task.color} h-10 w-1 rounded-lg`
                              )}
                            ></span>
                            <div className="flex flex-col overflow-hidden p-1 w-full">
                              <span className="text-xs text-white  font-semibold">
                                {task.title}
                              </span>
                              <span className="text-[8px] text-neutral-500 flex flex-row items-start justify-start gap-x-1">
                                <Clock
                                  size={12}
                                  className="text-neutral-500 flex-shrink-0"
                                />
                                <span className="">
                                  {format(taskStart, "HH:mm")} -{" "}
                                  {format(taskEnd, "HH:mm")}
                                </span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
