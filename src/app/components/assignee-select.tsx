import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
interface assigneeProps {
    data:{id:string,name:string | null,profileImage:string | null}[];
    onChange:(value:string)=>void
    defaultValue?:string
    disabled?:boolean
}
export default function AssigneeSelect({ data,onChange,defaultValue,disabled }: assigneeProps) {
  return (
    <div className="space-y-2">
      <Select
        defaultValue={defaultValue ?? ""}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id="select-38"
          className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0 focus:visible:ring-0 focus:ring-0 text-neutral-400 "
        >
          <SelectValue placeholder="Assign the task" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2 focus:visible:ring-0 focus:ring-0">
          <SelectGroup>
            {data?.map((user) => (
              <SelectItem value={user.id}>
                <span className="flex items-center gap-2">
                  <Image
                    src={user.profileImage || "https://via.placeholder.com/150"}
                    alt={user.id}
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <span>{user.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
