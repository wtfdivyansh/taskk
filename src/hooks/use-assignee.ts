"use client";
import { getAssignee } from "@/data-access/assignee";
import { useQuery } from "@tanstack/react-query";

export const useAssignee = (boardId:string) => {
  const {data,isLoading} = useQuery({
    queryKey: ["assignee",boardId],
    queryFn: async () => {
      const assignee = await getAssignee(boardId)
      return assignee;
    },
  });

  return {data,isLoading}
};