import { useQueryStates, parseAsFloat, parseAsString } from "nuqs";
export const useTaskFilters = () => {
  return useQueryStates({
    priority: parseAsString,
    assignee: parseAsString,
    dueDate: parseAsString,
  });
};
