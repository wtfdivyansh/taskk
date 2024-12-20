import { SlidersHorizontalIcon } from "lucide-react";

export default function FilterButton() {
    return (
      <div className="flex items-center justify-center border  border-neutral-900 rounded-md p-2 hover:bg-neutral-900/[0.2] hover:border-neutral-900/[0.3] w-fit h-fit gap-x-1 cursor-pointer ">
        <SlidersHorizontalIcon size={14}/>
        Filters
      </div>
    );


}

        