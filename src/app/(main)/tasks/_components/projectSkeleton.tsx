import { Skeleton } from "@/components/ui/skeleton";

 const ProjectSkeleton = () => {
  return (
    <div className="flex flex-row gap-y-5">
      <Skeleton className=" h-56 w-96 mx-2 rounded-xl" />
      <Skeleton className=" h-56 w-96 mx-2 rounded-xl" />
      <Skeleton className=" h-56 w-96 mx-2 rounded-xl" />
    </div>
  );
}

export default ProjectSkeleton;
