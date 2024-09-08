"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { ProjectForm } from "../forms/ProjectForm";

export default function ProjectModal() {
    const {isOpen, setIsOpen, onClose} = useModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      
      <DialogContent className="border border-neutral-700/[0.5] ">
        <DialogHeader className=" border-b border-neutral-700/[0.5] w-lg pb-6 ">
          <DialogTitle >Create a new project</DialogTitle>
         
        </DialogHeader>
        <ProjectForm />
      </DialogContent>
    </Dialog>
  );
}
