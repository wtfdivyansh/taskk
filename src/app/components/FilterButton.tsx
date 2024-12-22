import { ListChecksIcon, UserIcon} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriorityEnum } from "@/lib/types";
import { DatePicker } from "./DatePicker";
import { useTaskFilters } from "@/hooks/use-task-filters";

export default function FilterButton() {
    const [{priority, assignee, dueDate}, setFilters] = useTaskFilters();

   const onStatusChange = (value: string) => {
     if (value === "all") {
       setFilters({ priority: null});
     } else {
       setFilters({ priority: value as PriorityEnum, });
     }
   };

    return (
      <div className="flex flex-row gap-x-1">
        <Select defaultValue={undefined} onValueChange={onStatusChange}>
          <SelectTrigger className="flex flex-row gap-x-1 items-center">
            <ListChecksIcon />
            <SelectValue placeholder="Status" />
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value={PriorityEnum.LOW}>low</SelectItem>
              <SelectItem value={PriorityEnum.MEDIUM}>medium</SelectItem>
              <SelectItem value={PriorityEnum.HIGH}>high</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger className="flex flex-row gap-x-1 items-center">
            <UserIcon />
            <SelectValue placeholder="Assignee" />
            <SelectContent defaultValue={undefined}>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <DatePicker
          value={new Date()}
          onChange={(date: Date) => console.log(date)}
          disabled={!false}
        />
      </div>
    );
}

        