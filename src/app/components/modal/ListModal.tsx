"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { boardModalStore} from "@/hooks/use-modal-store";
import { TagForm } from "../forms/TagForm";
import { ListForm } from "../forms/ListForm";

export default function ListModal() {
  const { isOpen, onClose } = boardModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border border-neutral-700/[0.5] ">
        <DialogHeader className=" border-b border-neutral-700/[0.5] w-lg pb-6 ">
          <DialogTitle>Create a new Tag</DialogTitle>
        </DialogHeader>
        <ListForm />
      </DialogContent>
    </Dialog>
  );
}
