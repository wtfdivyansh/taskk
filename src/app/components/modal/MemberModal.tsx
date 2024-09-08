"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddMember } from "@/hooks/use-modal-store";
import { MemberForm } from "../forms/MemberForm";
export default function MemberModal() {
  const { isOpen, onClose, boardId } = useAddMember();
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border border-neutral-700/[0.5] " 
      onOpenAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader className=" border-b border-neutral-700/[0.5] w-lg pb-2 ">
          <DialogTitle>Add a member to your project</DialogTitle>
        </DialogHeader>
        <MemberForm />
  
      </DialogContent>
    </Dialog>
  );
}
