import { GetProjectInfo } from "@/actions/GetProjectInfo";
import { ProjectHeader } from "@/app/components/ProjectHeader";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CircleCheck, CircleDot, Flag, LoaderIcon, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AddMember from "./addMember";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RxLapTimer } from "react-icons/rx";
import { FcCancel } from "react-icons/fc";
import { LiaTagSolid } from "react-icons/lia";
import { currentUser } from "@clerk/nextjs/server";
import Main from "./main";

export const MainPage = async({
  params,
  searchParams,
}: {
  params: { taskId: string };
  searchParams: { [search: string]: string | undefined };
}) => {
      const user = await currentUser()
      const task = await GetProjectInfo(params.taskId);
      if(!task){
        return null
      }
  return (
     <div>
        <div className="flex flex-col gap-1 relative bg-[#0F1011]">
          <ProjectHeader name={task.name} />
        </div>
        <div className="flex flex-col gap-y-2 mt-4">
          <div className="flex flex-row justify-between">
            <h1 className="text-4xl font-normal text-neutral-300 px-6">
              {task.name}
            </h1>
            <Button className="  rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none  focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10 hover:bg-neutral-800/20 hover:shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] mx-4 flex flex-row items-center gap-x-1">
              <UserPlus size={16} />
              Invites
            </Button>
          </div>
          <div className="px-4 flex flex-col gap-y-4">
            <div className="flex flex-row items-center gap-x-1 gap-y-1">
              <Flag size={16} className="text-neutral-500" />
              <span className="text-neutral-500">Priority:</span>
              <Badge className="text-xs  bg-sky-500/40 text-sky-500 ring-1/[0.5] ring-white mx-2">
                {task.priority}
              </Badge>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <UserPlus size={16} className="text-neutral-500" />
              <span className="text-neutral-500">Team:</span>
              {task.boardMembers.map((mem, index) => (
                <Badge
                  key={index}
                  className="text-xs  bg-white ring-1/[0.5] ring-white mx-2 flex flex-row items-center gap-x-1"
                >
                  <div>
                    {mem.user.profileImage && <img src={mem.user.profileImage} className="w-4 h-4 rounded-full" />}
                  </div>
                 {mem.user.name === user?.firstName ? "You" : mem.user.name}
                </Badge>
              ))}
              <AddMember id={task.id} />
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <CalendarCheck size={16} className="text-neutral-500" />
              <span className="text-neutral-500">Due Date:</span>
              <span className="text-white text-sm font-mono">
                {format(new Date(), "dd MMMM yyyy")}
              </span>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <LoaderIcon size={16} className="text-neutral-500" />
              <span className="text-neutral-500">Status:</span>
              <Badge
                className={cn(
                  "text-xs  mx-2 flex flex-row items-center gap-x-1 shadow-md",
                  {
                    "bg-emerald-500/40 text-emerald-500":
                      task.status === "done",
                    "bg-red-500/40 text-red-500": task.status === "canceled",
                    "bg-sky-500/40 text-sky-500": task.status === "in progress",
                  }
                )}
              >
                {task.status === "in progress" || task.status === "ongoing" ? (
                  <RxLapTimer />
                ) : task.status === "done" ? (
                  <CircleCheck size={16} />
                ) : task.status === "canceled" ? (
                  <FcCancel />
                ) : (
                  <CircleDot />
                )}
                {task.status}
              </Badge>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <LiaTagSolid className="text-neutral-500" size={16} />
              <span className="text-neutral-500">Tags:</span>
              {task.tags.map((t, index) => (
                <Badge
                  key={index}
                  className={cn(
                    "text-xs border border-neutral-700/[0.3]  ",
                    t.tag.color
                  )}
                >
                  {t.tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <Main boardId={task.id} />
        </div>
      </div>
  )
}