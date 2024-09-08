import { GetBoardMembers } from "@/actions/GetBoardMembers";
import { useQuery} from "@tanstack/react-query";

export const useMemberData = () => {


     const {data:usersNotInBoard}= useQuery({
       queryKey: ["users"],
     })as any;


     const { data:boardMembers, isLoading: isLoadingMembers } = useQuery({
       queryKey: ["boardMembers"],
     }) as any;

     return {
       usersNotInBoard,
       boardMembers,
       isLoadingMembers,
     };

};