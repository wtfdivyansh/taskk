import AttachmentButton from "./attachment-button";
import AttachmentList from "./attachment-list";

export default function AttachmentBox({taskId}:{taskId:string}) {
  return (
    <div className="w-full border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 flex flex-col items-start h-[24rem]">
      <AttachmentButton taskId={taskId} />
      <AttachmentList taskId={taskId} />
    </div>
  );
}