import { GetBoardMembers } from "@/actions/GetBoardMembers";
import { usersNotInBoard } from "@/actions/usersNotInBoard";
import { dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import axios from "axios";

type props ={
    children:React.ReactNode,
    params:{taskId:string}

}
export default async function TaskLayout({children,params}:props) {
    const query = new QueryClient();
    await query.prefetchQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await usersNotInBoard(params.taskId);
        return res
      },
    });
    await query.prefetchQuery({
      queryKey: ["boardMembers"],
      queryFn: async () => {
        const res = await GetBoardMembers(params.taskId);
        return res;
      },
    });
  return (
    <>
      <HydrationBoundary state={dehydrate(query)}>{children}</HydrationBoundary>
    </>
  );
}