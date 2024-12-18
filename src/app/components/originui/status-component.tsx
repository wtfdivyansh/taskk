import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriorityEnum } from "@/lib/types";

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

export default function StatusSelect({
  onValueChange,
  defaultValue,
  disabled
}: {
  onValueChange: () => void;
  defaultValue: PriorityEnum;
  disabled? :boolean
}) {
  return (
    <div className="space-y-2">
      <Select value={defaultValue} onValueChange={onValueChange} disabled={disabled} >
        <SelectTrigger
          id="select-32"
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 focus:visible:ring-0 focus:ring-0"
          aria-placeholder="Select status"
        >
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="low">
            <span className="flex items-center gap-2">
              <StatusDot className="text-emerald-600" />
              <span className="truncate">Low</span>
            </span>
          </SelectItem>
          <SelectItem value="medium">
            <span className="flex items-center gap-2">
              <StatusDot className="text-yellow-500" />
              <span className="truncate">Medium</span>
            </span>
          </SelectItem>
          <SelectItem value="high">
            <span className="flex items-center gap-2">
              <StatusDot className="text-red-500" />
              <span className="truncate">High</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
