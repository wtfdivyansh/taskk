"use client"
import { TaskColor, Todo } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuBarChartBig } from "react-icons/lu";
import { LuTable } from "react-icons/lu";
import SearchBar from "@/app/components/SearchBar";
import FilterButton from "@/app/components/FilterButton";
import AddColumn from "@/app/components/AddColumn";
import Boards from "@/app/components/Boards";
import TableList from "@/app/components/TableList";
import Calender from "@/app/components/Calender";
import { getTaskDetails } from "@/actions/getTaskDetails";
import { useGetTasks } from "@/hooks/use-get-tasks";
import { useSearchParams } from "next/navigation";
import Loading from "../../loading";


export default  function Main({ boardId}: { boardId: string }) {
  const { data:columns =[], isLoading } = useGetTasks(boardId);
    const tasks: TaskColor[] = columns
      .map((column) => {
        const color = column.color;
        return column.todos.map((task: any) => {
          return {
            ...task,
            color: color,
          };
        });
      }).flat(1);
   
  return (
    <div className="flex flex-row items-start justify-between gap-x-1 mt-4">
      <Tabs defaultValue="list" className="w-full ">
        <div className="flex flex-row items-center justify-between gap-x-2">
          <TabsList className="bg-neutral-950 mx-2">
            <TabsTrigger value="board" className="flex flex-row gap-x-1 ">
              <LuBarChartBig />
              Board
            </TabsTrigger>
            <TabsTrigger value="list" className="flex flex-row gap-x-1">
              <LuTable />
              Table
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex flex-row gap-x-1">
              Calendar
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <SearchBar />
            <FilterButton />
            <AddColumn boardId={boardId} />
          </div>
        </div>
        {isLoading && (
        <div className="flex flex-col items-center justify-start w-full ">
          <Loading />
        </div>
        )}
        <>
        <TabsContent value="board" className="mx-2">
          <Boards columns={columns} boardId={boardId} />
        </TabsContent>
        <TabsContent value="list" className="mx-2  ">
          <TableList columns={columns} />
        </TabsContent>
        <TabsContent value="calendar" className="w-full  px-1">
          <Calender tasks={tasks} />
        </TabsContent>
        </>
      </Tabs>
      
    </div>
  );
}