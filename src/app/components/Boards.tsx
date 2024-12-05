"use client";
import { changeOrder } from "@/actions/ChangeOrder";
import SingleList from "./SingleList";
// import { BoardsProps } from "@/lib/types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Column, Todo } from "@/lib/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pusherClient } from "@/lib/pusher";
interface BoardsProps {
  columns: Column[];
  boardId:string;
}
function reorder(
  list: BoardsProps["columns"],
  sourceId: string,
  destinationId: string,
  sourceIndex: number,
  destinationIndex: number
) {
  const result:BoardsProps["columns"] = Array.from(list);
  console.log(result);

   const sourceList= result.find((item) => item.id === sourceId);
   const destinationList = result.find((item) => item.id === destinationId);
   
  
   if(!sourceList || !destinationList){
     return list
   }
 
   const [removed] = sourceList.todos.splice(sourceIndex,1);
   removed.columnId = destinationId;
   destinationList.todos.splice(destinationIndex,0,removed);  

   sourceList.todos.forEach((item,index) => {
     item.position = index +1;
   })
   destinationList.todos.forEach((item,index) => {
     item.position = index +1;
   })
   const newOrder = [...sourceList.todos,...destinationList.todos];
   const boardId= destinationList.boardId
   return {
    result,
    newOrder,
    boardId
    
   }
};
export default function Boards({columns,boardId}:BoardsProps) {

  const [list,setList] = useState<BoardsProps["columns"]>(columns);
    const onDragEnd = async(result: any) => {
        console.log(result);
        console.log(list);
        if(!result.destination.droppableId || !result.source.droppableId){
          return;
        }
        if (result.destination.droppableId === result.source.droppableId ) {
          return;
        }   

        if(!result.destination){
          return;
        }
       const {source,destination,type} = result;
       const sourceId = source.droppableId;
       const destinationId = destination.droppableId;

       if (type === "task") {
        
         const hehe = reorder(
           list,
           sourceId,
           destinationId,
           source.index,
           destination.index
         );
         if ("result" in hehe) {
           setList(hehe.result);
           
         }
         if ("newOrder" in hehe) {
        try{
          setList((old) => {
            return old.map((column) => {
              if(column.id === destinationId){
                return {
                  ...column,
                  todos: hehe.newOrder.filter((item) => item.columnId === column.id),
                }
              }
              return column;
            });
          });
         await changeOrder({ items: hehe.newOrder,boardId:hehe.boardId});
         toast.success("Order changed successfully");
          }catch(e){
           setList(columns)
           toast.error("Something went wrong");
          }
         }
       }
    }
    

     useEffect(() => {
       pusherClient.subscribe(boardId);
       pusherClient.bind("board-update", (data: any) => {
        // console.log(data.newData);
         setList(data.newData);
 
       });
       return () => {
         pusherClient.unsubscribe(boardId);
       }
     },[boardId]);

     
     useEffect(() => {
       setList(columns);
     },[columns]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row gap-x-2 w-screen" 
      >
        {list?.map((column, index) => (
            <SingleList column={column} key={column.id} index={index}  />
        ))}
      </div>
    
    </DragDropContext>
  );
}