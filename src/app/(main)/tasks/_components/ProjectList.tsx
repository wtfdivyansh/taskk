import { getProjects } from "@/data-access/projects";
import Projects from "@/app/components/projects";
import { SingleProject } from "@/app/components/SingleProject";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function ProjectList() {
    const projects = await getProjects();
  return (
    <div className="flex flex-row flex-wrap">
      {projects.map((project) => (
        <SingleProject key={project.id} project={project} />
      ))}
    </div>
  );
}