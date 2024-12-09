import { uploadFiles } from "@/actions/uploadFiles";
import { getAttachments } from "@/data-access/attachment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientUploadedFileData } from "uploadthing/types";

export const useAttachments = (taskId:string) => {
  const {data,isLoading,isFetching} = useQuery({
    queryKey: ["attachments",taskId],
    queryFn: async () => {
     const res = await getAttachments(taskId)
     console.log(res)
      return res
    },
    refetchOnMount:false
  });

  return {
    data,isLoading,isFetching
  }
};

export const useAttachmentMutation = (taskId:string)=>{
  const queryClient = useQueryClient();


  const {mutate, isPending} = useMutation({
    mutationFn: async ({ uploadResult }: { uploadResult: ClientUploadedFileData<{ uploadedBy: string }>[] }) => {
     const res = await uploadFiles({uploadResult,taskId});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["attachments",taskId] });
    },
  });

  return { mutate, isPending };
};
