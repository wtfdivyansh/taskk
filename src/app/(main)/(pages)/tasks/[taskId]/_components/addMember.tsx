"use client"
import { useAddMember } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { use, useEffect } from "react";

export default function AddMember({id}:{id:string}) {
    const {setIsOpen, setBoardId,boardId}= useAddMember()
   
    const handleClick = () => {
      setBoardId(id);
      setIsOpen(true);
    };
  return (
    <div className="rounded-full border border-dashed border-neutral-700/[0.2] bg-neutral-950 px-2 py-1 text-xs text-neutral-500 flex flex-row items-center gap-x-1 cursor-pointer" onClick={handleClick}>
      <Plus size={16} className="text-neutral-500" />
      <span className="text-neutral-500">Member</span>
    </div>
  );
}