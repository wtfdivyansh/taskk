"use client"
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCommentMutation } from "@/hooks/use-comments";

export default function CommentButton({taskId}:{taskId:string}) {
 const {comment,isPending,setComment,onSubmit}= useCommentMutation(taskId)
  return (
    <div className="space-y-2 flex flex-row w-full items-end justify-start border-2 border-neutral-700/[0.2] rounded-md  gap-x-2">
      <div className="border border-neutral-700/[0.5] rounded-lg p-1 flex flex-row items-center gap-x-2">
        <Avatar className="h-8 w-8 ">
          <AvatarImage src="https://github.com/shadcn.png" className="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="relative w-full flex flex-row items-center ">
        <Input
          className="pe-8"
          placeholder="comment"
          type="email"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isPending}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onSubmit}
        >
          <Send
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            aria-disabled={isPending}
          />
        </button>
      </div>
    </div>
  );
}
