"use client"
import { getTags } from "@/data-access/tags";
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