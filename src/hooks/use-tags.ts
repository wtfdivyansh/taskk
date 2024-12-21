"use client"
import { getTagByTask, getTags } from "@/data-access/tags";
import { useQuery } from "@tanstack/react-query";

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
     const {data,isLoading} = useQuery({
       queryKey: ["tags"],
       queryFn: async () => {
         const tags = await getTagByTask(taskId)
         return tags
       },
       refetchOnMount: false,
     });

    return {data,isLoading}
}