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
import { NewCardForm } from "../forms/newCardForm";

export default function CardModal() {
  const { isOpen, onClose } = useCardModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border border-neutral-700/[0.5] sm:min-w-[700px] p-0 max-h-[400px] h-[340px] ">
        <DialogHeader className="contents space-y-0 text-left p-0">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
           Create a new task
          </DialogTitle>
        </DialogHeader>
        <NewCardForm />
      </DialogContent>
    </Dialog>
  );
}
