export default function Attachment({ attachment }: { attachment: File }) {

  return (
    <div className="flex flex-row items-center gap-x-2 border border-neutral-700/[0.2] bg-neutral-900/70 rounded-md p-2 justify-start w-36 max-w-40">
     {attachment.type.includes("image")?
      (<img
        src={URL.createObjectURL(attachment)}
        alt="attachment"
        className="w-8 h-8 rounded-sm"
      />): (<img src={"/images/pdf.png"} alt="attachment" className="w-8 h-8 rounded-sm" />)}
      <div className="flex flex-col items-start justify-start  w-full overflow-hidden">
        <span className="text-sm font-mono text-neutral-400 truncate overflow-hidden w-full">
          {attachment.name}
        </span>
        <span className="text-xs text-neutral-400 truncate overflow-hidden w-full">
          {(attachment.size / (1024 * 1000)).toFixed(2) } MB
        </span>
      </div>
    </div>
  );
}
