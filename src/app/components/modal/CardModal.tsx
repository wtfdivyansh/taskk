"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCardModalStore} from "@/hooks/use-modal-store";
import { ProjectForm } from "../forms/ProjectForm";
import { CardForm } from "../forms/CardForm";

export default function CardModal() {
  const { isOpen, onClose } = useCardModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border border-neutral-700/[0.5] ">
        <DialogHeader className=" border-b border-neutral-700/[0.5] w-lg pb-6 ">
          <DialogTitle>Create a new card</DialogTitle>
        </DialogHeader>
        <CardForm />
      </DialogContent>
    </Dialog>
  );
}
