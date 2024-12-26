"use client";
import { ListChecksIcon, UserIcon, X } from "lucide-react";
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
import { useAssignee } from "@/hooks/use-assignee";
import { useBoardParams } from "@/hooks/use-boardParams";
import { Spinner } from "./Spinner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function FilterButton() {
  const [{ priority, assignee, dueDate }, setFilters] = useTaskFilters();
  const [clearFilters, setClearFilters] = useState(false);
  const boardId = useBoardParams();
  const { data: allAssignee = [],isLoading:isLoadingAssignees } = useAssignee(boardId.toString());
  const onStatusChange = (value: string) => {
    if (value == "all") {
      setFilters({ priority: null });
    } else {
      setFilters({ priority: value as PriorityEnum });
    }
  };
  const onAssigneeChange = (value: string) => {
    setFilters({ assignee: value });
  };
  const onDueDateChange = (value: Date) => {
    const date = value.toISOString();
    setFilters({ dueDate: date });
  };
  const onClearFilters = () => {
    setFilters({ priority: null, assignee: null, dueDate: null });
    setClearFilters(false);
  };
  useEffect(() => {
    setClearFilters(true);
  }, [priority, assignee, dueDate]);
  return (
    <div className="flex flex-row gap-x-1">
      <Select
        defaultValue={priority ?? undefined}
        onValueChange={onStatusChange}
      >
        <SelectTrigger className="flex flex-row gap-x-1 items-center bg-neutral-900/40 ring-0 focus:visible:ring-0 focus:visible:ring-0 ">
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
      <Select defaultValue={undefined} onValueChange={onAssigneeChange}>
        <SelectTrigger className="flex flex-row gap-x-1 items-center bg-neutral-900/40 ring-0 focus:visible:ring-0 ">
          <UserIcon />
          <SelectValue placeholder="Assignee" />
          <SelectContent>
            {isLoadingAssignees && <Spinner />}
            {allAssignee?.map((a) => (
              <SelectItem value={a.id}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>
      <DatePicker
        value={dueDate ? new Date(dueDate) : new Date()}
        onChange={onDueDateChange}
        disabled={!false}
      />
      {clearFilters && (
        <Button onClick={onClearFilters} variant={"ghost"}>
          <X className="flex items-center  text-neutral-500" />
        </Button>
      )}
    </div>
  );
}
