import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getRandomColor } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Board, Tags } from "@prisma/client";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
interface SingleProjectProps {
  project: Board & {
    tags: ({
      tag: { id: string; name: string; userId: string; color: string | null };
    } & { boardId: string; tagId: string })[];
  };
}
export function SingleProject({project}: SingleProjectProps) {
  return (
    
    <div className="flex flex-col gap-y-2 mt-4">
      <Link href={`/tasks/${project.id}`}>
      <Card className=" flex flex-col h-56 w-96 mx-2 bg-neutral-950 border border-neutral-700/[0.3] cursor-pointer group px-2 py-2 gap-y-2  shadow-md ">
        
        <div
          className={cn(
            "flex flex-col gap-y-1 w-[360px] rounded-xl justify-center items-center h-24 bg-neutral-800 border border-neutral-700/[0.3] relative"
          )}
        >
            <span className={cn("w-auto px-2 flex items-center justify-center h-6 rounded-lg absolute top-2 right-2 text-xs font-mono", {
                "bg-emerald-500 ": project.status === "done",
                "bg-blue-500/20 text-blue-500 border border-blue-600/[0.1]": project.status === "in progress" || project.status === "ongoing",
                "bg-red-500": project.status === "canceled",
              })}
            >{project.status}</span>
            
            
        </div>
        <div className="flex flex-col flex-wrap">
            <h1 className="text-xl font-semibold  text-neutral-300">{project.name}</h1>
            <p className="text-sm text-neutral-500 flex text-wrap">{project.description}</p>
            {!project.description && <div className="h-4"></div>}
            {project.tags.length> 0 &&(
            <div className="flex flex-wrap items-center">
              {project.tags.map((tag, index) => (
                <Badge key={index} className={cn("text-xs text-neutral-300 ",tag.tag.color)}>{tag.tag.name}</Badge>
              ))}

            </div>
            )}
        </div>
        <div className="flex flex-col gap-y-2 ">
            <Progress value={50} max={100} className="h-2" />
            <div className="flex flex-row justify-between items-center gap-x-2">
                <span className="bg-neutral-950 border border-neutral-700/[0.3] rounded-lg px-2 py-1 text-xs text-neutral-300">
                    50% completed
                </span>
                <span className="flex flex-row text-sm gap-x-1 text-neutral-300">
                    <Calendar className="w-4 h-4 text-neutral-600"/>{format(new Date(project?.dueDate), "MMM dd")}
                </span>
            </div>

        </div>
       
      </Card>
       </Link>
    </div>
  );
}