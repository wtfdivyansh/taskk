import { SingleProject } from "@/app/components/SingleProject";
import Projects from "@/app/components/projects";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProjectList from "./_components/ProjectList";
import { Suspense } from "react";
import ProjectSkeleton from "./_components/projectSkeleton";

export default async function Tasks() {
  return (
    <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl backdrop-blur-sm border-muted-foreground/20 overflow-scroll mt-2 bg-[#0F1011]">
      <div className="flex flex-col gap-1 relative">
        <h1 className="text-4xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex items-center border-b bg-[#0F1011]">
          Tasks
        </h1>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl mx-3 mt-1 font-semibold">Your Projects</h1>
      </div>
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectList />
      </Suspense>
      <Projects />
    </div>
  );
}