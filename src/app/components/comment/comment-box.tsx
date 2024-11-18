"use client"

import { useComments } from "@/hooks/use-comments";
import Comment from "./comment";

export default function CommentBox({taskId}:{taskId:string}) {
  const {data,isLoading}= useComments(taskId)
  if(data == undefined){
    return <div>no data found! Please refetch</div>
  }
  return (
    <div className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-col items-start h-[21rem] ">
      <div>
        {data?.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
}