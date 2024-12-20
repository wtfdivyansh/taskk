"use client"
import { toggleSubtask } from "@/actions/createSubtasks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Subtask} from "@prisma/client";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
interface SubtaskProps {
    subtask: {
        id: string;
        title: string;
        isCompleted: boolean;
        taskId: string;
    }
}
export default function SubtaskComponent({ subtask }: SubtaskProps) {
const query =  useQueryClient()
    
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
    <div className="flex gap-2 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2  flex-row items-center h-12">  
      <Checkbox
        id={subtask.id}
        className="rounded-full data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
        defaultChecked = {subtask.isCompleted}

        onCheckedChange={() => mutation.mutate()}
      />
      <Label
        htmlFor="checkbox-06"
        className="peer-data-[state=checked]:line-throgh relative after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:ease-in-out peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      >
        {subtask.title}
      </Label>
    </div>
  );
}




        
            