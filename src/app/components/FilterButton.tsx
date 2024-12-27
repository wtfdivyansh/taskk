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
    if (priority == null && assignee == null && dueDate == null) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [priority, assignee, dueDate]);
  return (
    <div className="flex sm:flex-row flex-col gap-x-1 gap-y-1">
      <Select value={priority ?? ""} onValueChange={onStatusChange}>
        <SelectTrigger className="flex flex-row gap-x-1 items-center bg-neutral-900/40 ring-0 focus:visible:ring-0 focus:visible:ring-0 sm:w-auto w-full">
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
      <Select value={assignee ?? ""} onValueChange={onAssigneeChange}>
        <SelectTrigger className="flex flex-row gap-x-1 items-center bg-neutral-900/40 ring-0 focus:visible:ring-0 sm:w-auto w-full ">
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
      <div className="sm:w-auto w-full">
        <DatePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          className="bg-neutral-900/40 ring-0 focus:visible:ring-0 sm:w-auto w-full"
          onChange={onDueDateChange}
          disabled={!false}
        />
      </div>
      {clearFilters && (
        <Button onClick={onClearFilters} variant={"ghost"}>
          <X className="flex items-center  text-neutral-500" />
        </Button>
      )}
    </div>
  );
}
