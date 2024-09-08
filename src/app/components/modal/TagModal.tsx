"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cateogaryModalStore } from "@/hooks/use-modal-store";
import { TagForm } from "../forms/TagForm";


export default function TagModal() {
  const { isOpen, onClose } = cateogaryModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border border-neutral-700/[0.5] ">
        <DialogHeader className=" border-b border-neutral-700/[0.5] w-lg pb-6 ">
          <DialogTitle>Create a new Tag</DialogTitle>
        </DialogHeader>
        <TagForm/> 
       
      </DialogContent>
    </Dialog>
  );
}
