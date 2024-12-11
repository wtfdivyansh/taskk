"use client"
import { useAttachments } from "@/hooks/use-attachments";
import { UploadedAttachment } from "./attachment";
import { Loader2 } from "lucide-react";

export default function AttachmentList({taskId}:{taskId:string}) {
  const {data,isLoading,isFetching}= useAttachments(taskId)
 
  if(isLoading){
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
      </div>
    );
  }
   if (!data) {
     return <div>No attachments found</div>;
   }
  return (
    <div className="flex flex-row gap-x-2 gap-y-1 flex-wrap ">
      {data.map((attachment) => (
        <UploadedAttachment attachment={attachment} />
      ))}
    </div>
  );
}