"use client"
import { createComment } from "@/actions/createComment";
import { useMutation, useQueryClient } from "@tanstack/react-query"
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