"use client";
import { getTaskById, getTaskDetails } from "@/actions/getTaskDetails";
import { updateTask } from "@/actions/updateTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useGetTasks(boardId: string) {
  const search = useSearchParams().get("search");
  const priority = useSearchParams().get("priority");
  const assignee = useSearchParams().get("assignee");
  const dueDate = useSearchParams().get("dueDate");
  console.log("id",assignee)
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", boardId, search, priority,assignee,dueDate],
    queryFn: async () => {
      const res = await getTaskDetails(
        boardId,
        search,
        priority,
        assignee,
        dueDate
      );
      console.log("yooooo");
      return res;
    },
    enabled: !!boardId,
    staleTime: 0,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export const useEditTask = (boardId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ taskId, data }: { taskId: string; data: any }) => {
      const res = await updateTask(taskId, data);
      return res;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks", data.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["tasks", boardId],
      });
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};

export const useGetSingleTask = (taskId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const res = await getTaskById(taskId);
      return res;
    },
    enabled: !!taskId,
  });
  return {
    data,
    isLoading,
    error,
  };
};
