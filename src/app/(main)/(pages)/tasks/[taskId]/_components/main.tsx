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
import { useGetTasks } from "@/hooks/use-get-tasks";
import Loading from "../../loading";
import { Separator } from "@/components/ui/separator";
import { useBoardParams } from "@/hooks/use-boardParams";


export default  function Main() {
  const boardId = useBoardParams();
  const { data:columns =[], isLoading } = useGetTasks(boardId.toString());
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
    <div className="w-full gap-x-1 mt-2 p-1 border-2 border-neutral-700/[0.6] rounded-md">
      <Tabs defaultValue="board" className=" py-1 flex flex-col ">
        <div className="flex flex-col gap-y-1 sm:flex-row items-start justify-between w-full  ">
          <TabsList className="bg-transparent w-full sm:w-auto flex flex-row  items-start ">
            <TabsTrigger
              value="board"
              className="flex flex-row gap-x-1  rounded-md data-[state=active]:bg-neutral-800/40"
            >
              <LuBarChartBig />
              Board
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex flex-row gap-x-1  rounded-md data-[state=active]:bg-neutral-800/40"
            >
              <LuTable />
              Table
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="flex flex-row gap-x-1  rounded-md data-[state=active]:bg-neutral-800/40"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-row gap-x-1 gap-y-1 w-full md:flex-nowrap flex-wrap sm:w-auto">
            <div className="flex flex-row items-center w-full  gap-x-2">
              <SearchBar />
            </div>
            <div className="flex flex-row  ">
              <AddColumn boardId={boardId.toString()} />
            </div>
          </div>
        </div>
        <Separator className="w-full " />
        <div className="mx-2 mt-2">
          <FilterButton />
        </div>
        {isLoading && (
          <div className="flex flex-row  items-center justify-center w-full h-auto  mt-2 ">
            <Loading />
          </div>
        )}
        <>
          <TabsContent value="board" className="">
            <Boards columns={columns} boardId={boardId.toString()} />
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