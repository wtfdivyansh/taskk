import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

interface CommentProps {
  comment: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string | null;
      username: string;
      profileImage: string | null;
    };
  };
}
export default function Comment({ comment }: CommentProps) {
    const auth = useAuth();
    const isCommentByCurrentUser = comment.user.id === auth.userId;
    
  return (
    <div
      className={cn("flex flex-row gap-x-2 items-start", {
        "justify-end": isCommentByCurrentUser,
      })}
    >
      {!isCommentByCurrentUser && (
        <div className="h-8 w-8 rounded-full">
          <img
            src={comment.user?.profileImage || "https://github.com/shadcn.png"}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      )}
      <div
        className={cn("flex flex-col ")}
      >
        <p className={cn("text-neutral-500 text-sm text-wrap",{"text-end": isCommentByCurrentUser})}>
          {isCommentByCurrentUser ? "You" : comment.user.name}
        </p>
        <p className="text-neutral-400 text-sm text-wrap">{comment.content}</p>
      </div>
      {isCommentByCurrentUser && (
        <div className="h-8 w-8 rounded-full">
          <img
            src={comment.user.profileImage || "https://github.com/shadcn.png"}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      )}
    </div>
  );
}