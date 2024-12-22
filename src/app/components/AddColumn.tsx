"use client";
import { Button } from "@/components/ui/button";
import { boardModalStore } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

export default function AddColumn({boardId}:{boardId:string}) {
    const {setIsOpen,setBoardId} = boardModalStore()
    const handleClick = () => {
      setBoardId(boardId)
      setIsOpen(true)
    }
    return (
      <Button variant="outline" className="w-fit p-3 h-fit  cursor-pointer " onClick={handleClick}>
        <Plus size={16} />
      </Button>
    );

}