import { UploadedFile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Attachment({ attachment,isUploading }: { attachment: File ; isUploading?:boolean }) {

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-x-2 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 justify-start w-36 max-w-40",
        isUploading && "animate-pulse"
      )}
    >
      {isUploading ? (
        <div className="w-8 h-8 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
        </div>
      ) : attachment.type.includes("image") ? (
        <Image
          src={URL.createObjectURL(attachment)}
          alt="attachment"
          className="w-8 h-8 rounded-sm object-cover"
        />
      ) : (
        <img
          src="/images/pdf.png"
          alt="attachment"
          className="w-8 h-8 rounded-sm"
        />
      )}
      <div className="flex flex-col items-start justify-start  w-full overflow-hidden">
        <span className="text-sm font-mono text-neutral-400 truncate overflow-hidden w-full">
          {attachment.name}
        </span>
        <span className="text-xs text-neutral-400 truncate overflow-hidden w-full">
          {(attachment.size / (1024 * 1000)).toFixed(2)} MB
        </span>
      </div>
    </div>
  );
}

export const UploadedAttachment=({attachment}:{attachment:UploadedFile})=>{
 return (
   <div
     className={cn(
       "flex flex-row items-center gap-x-2 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 justify-start w-36 max-w-40",
     )}
   >
      {attachment.type.includes("image") ? (
       <Image
         src={attachment.url}
         alt="attachment"
         width={100}
         height={100}
         className="w-8 h-8 rounded-sm object-cover"
       />
     ) : (
       <img
         src="/images/pdf.png"
         alt="attachment"
         className="w-8 h-8 rounded-sm"
       />
     )}
     <div className="flex flex-col items-start justify-start  w-full overflow-hidden">
       <span className="text-sm font-mono text-neutral-400 truncate overflow-hidden w-full">
         {attachment.name}
       </span>
       <span className="text-xs text-neutral-400 truncate overflow-hidden w-full">
         {/* {(attachment.size / (1024 * 1000)).toFixed(2)} MB */}
       </span>
     </div>
   </div>
 );
}
