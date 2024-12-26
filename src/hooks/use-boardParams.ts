"use client";
import { useParams} from "next/navigation";
import { useMemo } from "react";

export const useBoardParams = () => {
   const params = useParams();
   console.log("paramsssssssssssssss")
   const boardId = useMemo(() => params.taskId, [params]);
   console.log(boardId)
   return boardId
};