
import { Spinner } from "@/app/components/Spinner";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSubtasks, useSubtasksData } from "@/hooks/use-subtasks";
import { FiPlus } from "react-icons/fi";
import Subtask from "./subtask";
import SubtaskComponent from "./subtask";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";

export default function Subtasks({taskId}:{taskId:string}) {
 const{data,isLoading}= useSubtasksData(taskId)
 const {onSubmit,isPending,title,setTitle}= useSubtasks(taskId)
 const completedTasks = data?.filter((x)=>x.isCompleted == true).length
 if (data == undefined) {
   return <div>Loading...</div>;
 }

  return (
    <>
      <div className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-col items-start h-[21rem] ">
        <div className="flex flex-row justify-between items-start w-full pb-2">
          <p className="text-neutral-400 text-md font-bold text-wrap">
            Subtasks
          </p>
          <div className="font-md text-neutral-500 flex flex-row gap-x-1 items-center">
            <AnimatedCircularProgressBar
              max={data.length}
              value={completedTasks!}
              min={0}
              gaugePrimaryColor="rgb(79 70 229)"
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
              className="h-6 w-6 font-sm"
            />
            {completedTasks}/ {data?.length}
          </div>
        </div>
        <ScrollArea className="w-full">
          {data.length == 0 ? (
            <div className="flex flex-col items-center justify-center gap-y-2  text-neutral-500">
              <p>No Subtasks</p>
              <p>Add a new Subtask</p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-y-2">
              {isLoading && <Spinner />}

              {data?.map((subtask) => (
                <SubtaskComponent subtask={subtask} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
      <div className="mt-1 bg-neutral-900/50 text-white px-2 py-1 rounded-md flex flex-row justify-start items-center gap-x-2 group cursor-pointer border border-neutral-700/[0.2]">
        <div
          className="flex flex-row items-center gap-x-2 border border-neutral-700/[0.2] rounded-md p-1 hover:bg-neutral-700/[0.2]"
          onClick={onSubmit}
        >
          <FiPlus size={20} className="text-neutral-200 " />
        </div>
        <Separator orientation="vertical" className="bg-neutral-900" />
        <Input
          className="text-neutral-500 focus-visible:ring-0 focus:visible:outline-none border-none focus:visible-border-none focus-visible:ring-offset-0 bg-transparent"
          placeholder="Add a new Subtask"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        ></Input>
      </div>
    </>
  );
}