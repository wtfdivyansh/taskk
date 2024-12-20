"use client"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSubtasks } from "@/hooks/use-subtasks";
import { FiPlus } from "react-icons/fi";

export default function SubtaskButton({taskId}:{taskId:string}) {
    const { onSubmit, isPending, title, setTitle } = useSubtasks(taskId);
  return (
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
  )
}
    