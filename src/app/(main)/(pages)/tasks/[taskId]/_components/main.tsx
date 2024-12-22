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
import { Separator } from "@/components/ui/separator";


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
    <div className="w-full gap-x-1 mt-2 p-1">
      <Tabs defaultValue="list" className=" ">
        <div className="flex flex-col gap-y-1 sm:flex-row items-start justify-between w-full  ">
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
          <div className="flex flex-row gap-x-1 gap-y-1 flex-wrap mx-2">
            <div className="flex flex-row items-center   gap-x-2">
              <SearchBar />
            </div>
            <div className="flex flex-row gap-x-1">
              <AddColumn boardId={boardId} />
            </div>
          </div>
        </div>
        <Separator className="w-full " />
        <div className="flex flex-row mx-2 mt-2">
          <FilterButton />
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-start w-full bg-neutral-950 mt-2 ">
            <Loading />
          </div>
        )}
        <>
          <TabsContent value="board" className="">
            <Boards columns={columns} boardId={boardId} />
          </TabsContent>
          <TabsContent value="list" className=" w-full  ">
            <TableList columns={columns} />
          </TabsContent>
          <TabsContent value="calendar" className="w-full">
            <Calender tasks={tasks} />
          </TabsContent>
        </>
      </Tabs>
    </div>
  );
}