import { Spinner } from "@/app/components/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}
