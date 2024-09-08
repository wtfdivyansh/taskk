import { TaskColor } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getMonth,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { Clock } from "lucide-react";
import { useEffect, useRef } from "react";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
interface MonthsProps {
  month: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  tasks: TaskColor[];
}
export default function Months({month,setCurrentMonth,tasks}:MonthsProps) {
  const StartOfMonth = startOfMonth(month);
  const EndOfMonth = endOfMonth(month);
  const DaysInMonth = eachDayOfInterval({
    start: StartOfMonth,
    end: EndOfMonth,
  });
  const dayIndex = getDay(StartOfMonth);
  const today = new Date();
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(month, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(month, 1));
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCurrentMonth(month);
  }, []);
 useEffect(() => {
    scrollRef.current?.scroll({ top: 20 , behavior: "smooth" });
 }, [month, tasks]);
  return (
    <div className="bg-neutral-950 rounded-md mx-auto px-2 border border-neutral-700/[0.15] bg-neutral-900/20">
      <div className="flex-1 grid grid-cols-7 mt-4 bg-neutral-950  rounded-md mx-auto px-2 ">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-8 w-36 py-8 "
          >
            <span className="text-lg font-mono text-neutral-400">{day}</span>
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 mt-2 h-[calc(100vh-100px)] overflow-scroll"
        ref={scrollRef}
      >
        {new Array(dayIndex).fill(0).map((_, index) => (
          <div
            key={index + 1000}
            className="flex flex-col "
          ></div>
        ))}
        <div className="bg-transparent"></div>
        {DaysInMonth.map((day, index) => (
          <div
            key={index}
            className="flex flex-col  h-36 w-full border border-neutral-700[0.15] bg-[#0b0b0b] overflow-scroll hover:bg-neutral-900/40 cursor-pointer "
          >
            <span
              className={cn("text-xs text-neutral-300 p-1 flex items-center font-mono ", {
                "rounded-full  text-emerald-500": isToday(day),
              })}
            >
              {format(new Date(day), "dd")}
            </span>
            {tasks
              .filter((task) => task.dueDate && isSameDay(task.dueDate, day))
              .map((task) => (
                <div
                  className={cn(
                    `flex flex-row gap-x-1 mt-1 w-36 h-10 rounded-sm mx-1 bg-gradient to-r from-${task.color}/40 to-transparent border-neutral-700/[0.2] border  shadow-lg shadow-${task.color} hover:bg-neutral-900/20 cursor-grab`
                  )}
                >
                  <span
                    className={cn(`bg-${task.color} h-10 w-1 rounded-lg `)}
                  ></span>
                  <div className="flex flex-row items-start justify-start gap-x-1 ">
                    <div className="flex flex-col">
                      <span className={cn(`text-xs text-white p-1 `)}>
                        {task.title}
                      </span>
                      <span className="text-[8px] text-neutral-500 flex flex-row items-start justify-start gap-x-1">
                        <Clock size={12} className="text-neutral-500" />
                        {task.dueDate &&
                          format(new Date(task.dueDate), "dd MMMM")}
                      </span>
                    </div>

                    {/* <Badge
                      className={cn(
                        "text-xs text-neutral-300 w-fit h-fit px-1 flex flex-row items-center gap-x-1",
                        {
                          "bg-white/15 text-white": task.priority === "low",
                          "bg-yellow-500/40 text-yellow-500":
                            task.priority === "medium",
                          "bg-red-500/40 text-red-500":
                            task.priority === "high",
                        }
                      )}
                    >
                      <RiProgress4Line size={16} />
                      {task.priority}
                    </Badge> */}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
