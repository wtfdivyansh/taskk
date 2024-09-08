"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useModalStore } from "@/hooks/use-modal-store";
import { Plus, PlusCircleIcon } from "lucide-react";
export default function Projects() {
    const { setIsOpen} = useModalStore();
  return (
    <div className="flex flex-col gap-y-2 mt-4">
      <Card className="w-96 mx-2 border-[3px] border-dashed h-56 bg-neutral-900 cursor-pointer group flex flex-col justify-center items-center rounded-xl hover:scale-[1.01] transition-all ">
        <div className="flex flex-col gap-y-1 justify-center items-center"
        onClick={() => setIsOpen(true)}>
            <Plus size={40} className=" text-neutral-600 group-hover:text-white transition-all" />
    
            <span className="text-zinc-200 opacity-0 text-md font-medium group-hover:opacity-100 transition-opacity">
             Create a new project
            </span>
        </div>
      </Card>
    </div>
  );
}