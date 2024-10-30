"use client"
import { createSubtasks } from "@/actions/createSubtasks"
import { getSubtasks } from "@/data-access/subtasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"

export const useSubtasks = (taskId:string) => {
    const [title, setTitle]= useState("")
    const queryClient  = useQueryClient()
    
    const {mutate , isPending} = useMutation({
        mutationFn:async()=>{
          const res = await createSubtasks(taskId,title)
        },
        onSuccess:async()=>{
          
          await queryClient.invalidateQueries({queryKey:["subtasks",taskId]})
          setTitle("");
        },
        onError:()=>{
          toast.error("Something went wrong")
        }
    })
    const onSubmit=()=>{
      if(title.trim()== "" || title.length == 0){
        return 
      }
      mutate()
    }
    return {onSubmit,title,isPending,setTitle}
}

export const useSubtasksData = (taskId:string) => {
    //fix fetching till it doesnot revalidate on demand
    const {data,isLoading}= useQuery({
        queryKey:["subtasks",taskId],
        queryFn:async()=>{
            const res = await getSubtasks(taskId)

            return res
        },
        refetchOnMount:false        
    })
    return {data ,isLoading}
}