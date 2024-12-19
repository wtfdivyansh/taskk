"use client";
import { getTaskDetails } from "@/actions/getTaskDetails";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";


export function useGetTasks(boardId: string) {
   const search = useSearchParams().get("search");
   const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", boardId],
    queryFn: async () => {
      const res = await getTaskDetails(boardId,search);
      
      return res
    },
    enabled: !!boardId,
  });

  return {
    data,
    isLoading,
    error,
  }
}