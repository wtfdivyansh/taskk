"use client"
import { addTagsToTask } from "@/actions/updateTags";
import { getTagByTask, getTags } from "@/data-access/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add } from "date-fns";

export const useTags = () => {
     const {data,isLoading} = useQuery({
       queryKey: ["tags"],
       queryFn: async () => {
         const tags = await getTags()
         return tags
       },
       refetchOnMount: false,
     });

    return {data,isLoading}
}

export const useTaskTags = (taskId:string) => {
    const queryClient= useQueryClient()
     const {data,isLoading} = useQuery({
       queryKey: ["tags", taskId],
       queryFn: async () => {
         const tags = await getTagByTask(taskId)
         return tags
       },
       refetchOnMount: false,
     });

     const {mutate,isPending} = useMutation({
    
       mutationFn: async ({data}: { data: any }) => {
         const res = await addTagsToTask(taskId, data);
         return res;
       },
       onSuccess: async() => {
         await queryClient.invalidateQueries({
           queryKey: ["task", taskId],
         });
         await queryClient.invalidateQueries({
           queryKey: ["tags", taskId],
         });
       },
     });

    return {data,isLoading,mutate,isPending}
}