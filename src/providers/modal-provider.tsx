"use client"

import CardModal from "@/app/components/modal/CardModal";
import ListModal from "@/app/components/modal/ListModal";
import MemberModal from "@/app/components/modal/MemberModal";
import ProjectModal from "@/app/components/modal/ProjectModal";
import TagModal from "@/app/components/modal/TagModal";
import { useEffect, useState } from "react";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
   useEffect(() => {
     setMounted(true);
     return () => setMounted(false);
   }, []);
   if (!mounted) {
     return null;
   }
  return <>
  <ProjectModal />
  <TagModal />
  <ListModal />
  <CardModal />
  <MemberModal />
  {children}
  </>;
}