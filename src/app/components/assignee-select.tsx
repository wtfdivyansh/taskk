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
    data:{id:string,name:string | null,profileImage:string | null}[]
}
export default function AssigneeSelect({ data }: assigneeProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-38">Options with avatar</Label>
      <Select defaultValue="s1">
        <SelectTrigger
          id="select-38"
          className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectGroup>
            <SelectLabel className="ps-2">Assingee</SelectLabel>
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
