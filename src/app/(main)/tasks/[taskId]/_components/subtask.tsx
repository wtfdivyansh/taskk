"use client"
import { toggleSubtask } from "@/actions/createSubtasks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Subtask} from "@prisma/client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Old_Standard_TT } from "next/font/google";
interface SubtaskProps {
    subtask: {
        id: string;
        title: string;
        isCompleted: boolean;
        taskId: string;
    }
}
export default function SubtaskComponent({ subtask }: SubtaskProps) {
    const query = new QueryClient()
    
const mutation = useMutation({
  mutationFn: async () => {
    return await toggleSubtask(subtask.id, subtask.isCompleted);
  },
  onMutate: async () => {
    await query.cancelQueries({ queryKey: ["subtasks", subtask.taskId] });

    const prev = query.getQueryData<Subtask[]>(["subtasks", subtask.taskId]);

    query.setQueryData<Subtask[]>(["subtasks", subtask.taskId], (prev) =>
      prev?.map((s) =>
        s.id === subtask.id ? { ...s, isCompleted: !subtask.isCompleted } : s
      )
    );

    return { prev };
  },
  onSuccess: async () => {
    await query.invalidateQueries({ queryKey: ["subtasks", subtask.taskId] });
  },
  onError: (error, variables, context) => {
    if (context?.prev) {
      query.setQueryData(["subtasks", subtask.taskId], context.prev);
    }
  },
});
    return (
      <div
        key={subtask.id}
        className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-row items-center h-12
                gap-x-2   "
      >
        <Input
          type="checkbox"
          className="text-neutral-900/70 h-4 w-4 focus-visible:ring-0 focus:visible:outline-none border-none focus:visible-border-none focus-visible:ring-offset-0 bg-transparent accent-green-500"
          checked={subtask.isCompleted}
          onChange={() => mutation.mutate()}
        />
        <p
          className={cn(
            "text-neutral-500 text-sm font-bold text-wrap",
            subtask.isCompleted && "line-through, text-neutral-600"
          )}
        >
          {subtask.title}
        </p>
      </div>
    );
}

        
            