"use client"
import { createComment } from "@/actions/createComment";
import { getComments } from "@/data-access/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

export const useCommentMutation = (taskId:string)=>{
   const queryClient = useQueryClient();
   const [comment ,setComment] = useState("")

   const {mutate, isPending} = useMutation({
    mutationFn: async () => {
     const res = await createComment(taskId,comment);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments",taskId] });
      setComment("");
    },
  });
  const onSubmit = () => {

    mutate();
  };
  return {
    comment,
    setComment,
    isPending,
    onSubmit
  }
}

export const useComments = (taskId:string)=>{
  const {data,isLoading } = useQuery({
    queryKey: ["comments",taskId],
    queryFn: async () => {
      const res =await getComments(taskId);
      console.log(res)
      return res
    },
    refetchOnMount: false,
  });
  return {
    data,
    isLoading
  }
}