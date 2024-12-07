import { UploadCloud } from "lucide-react"

export default function AttachmentButton({taskId}:{taskId:string}) {
  return (
    <div className="w-full p-8 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md flex flex-row items-center justify-center cursor-pointer">
      <div>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <div className="w-10 h-10 border border-blue-700/[0.8] flex items-center justify-center rounded-md bg-sky-600 bg-blend-normal">
            <UploadCloud className="text-gray-200 text-2xl" />
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <span className="text-md text-neutral-400">Click to upload </span>
            <span className="text-md text-neutral-600">or drag and drop</span>
          </div>
          <span className="text-md text-neutral-600">
            PNG,JPF,PDF(max 800x400px)
          </span>
        </div>
      </div>
    </div>
  );
}