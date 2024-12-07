"use client"

import { useComments } from "@/hooks/use-comments";
import Comment from "./comment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { use, useEffect, useRef } from "react";

export default function CommentBox({taskId}:{taskId:string}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const {data,isLoading}= useComments(taskId)
  
  const hasComments = data && data?.length > 0;
  useEffect(() => {
    if (bottomRef.current && hasComments) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.length, hasComments]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
   
      <div className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-col items-start h-[21rem] ">
         <ScrollArea className="w-full  overflow-y-auto p-3">
        <div className="w-full flex flex-col gap-y-2 ">
          {data?.map((comment) => (
            <Comment comment={comment} />
          ))}
          <div ref={bottomRef}></div>
        </div>
        </ScrollArea>
      </div>
   
  );
}