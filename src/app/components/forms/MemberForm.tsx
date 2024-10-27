"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cateogaryModalStore, useAddMember } from "@/hooks/use-modal-store";
import MultipleSelector, { Option } from "@/components/ui/multi";
import { Check, Copy, Cross, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AddMember } from "@/actions/AddMember";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FcCancel } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { GetBoardMembers } from "@/actions/GetBoardMembers";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useMemberData } from "@/hooks/use-member-data";
import { pusherClient, pusherServer } from "@/lib/pusher";


const formSchema = z.object({
 users: z.array(z.object({
  value:z.string(),
  label:z.string(),
  image:z.string(),
})).min(0),
});

export function MemberForm() {
  const queryClient = useQueryClient();
  const [isLoading,setIsLoading] = useState(false)
  const [copy,setCopy] = useState(false)
  const { onClose,boardId } = useAddMember();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      users: [],
    },
    resolver: zodResolver(formSchema),
  });
  const{setValue,watch}=form

  const users = watch("users");

  const { boardMembers, usersNotInBoard, isLoadingMembers } = useMemberData();


  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {

      await AddMember(boardId,data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  const handleCopy = () => {
    setCopy(true);
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(inviteLink);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
    
  };
  const inviteLink = boardMembers?.inviteCode ? `${window.location.origin}/join/${boardMembers?.inviteCode}` : "";
  
  useEffect(() => {
    console.log(usersNotInBoard,boardMembers);
  }, [usersNotInBoard,boardMembers]);
   // todo implement realtime invite in notification not here
  // useEffect(() => {
  //   pusherClient.subscribe("invite");
  //   pusherClient.bind("invite", (data: any) => {
  //     console.log(data);

  //     const me = usersNotInBoard.find((user: any) => user.id === data.userId);
  //     console.log(me);
     
  //     if (me) {
  //       return;
  //     }
  //     toast.success(data.message);
  //   });

  //   return () => {
  //     pusherClient.unsubscribe("invite"+boardId);
  //   }
  // }, [boardId]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Members</FormLabel>
              <FormControl>
                <MultipleSelector
                  options={usersNotInBoard?.map((tag: any) => ({
                    label: tag.name,
                    value: tag.id,
                    image: tag.profileImage,
                  }))}
                  disabled={false}
                  onChange={(
                    value: {
                      label: string;
                      value: string;
                      image?: string | undefined;
                    }[]
                  ) => {
                    console.log("value", value);
                    setValue(
                      "users",
                      value.map((tag: Option) => ({
                        value: tag.value,
                        label: tag.label,
                        image: tag.image ?? "",
                      })),
                      { shouldValidate: true }
                    );
                  }}
                  value={users}
                  placeholder="Search for members"
                  loadingIndicator="Loading..."
                  emptyIndicator="No members left"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-y-2 w-full">
          <span className="text-md font-medium text-muted-foreground ">
            Project Members
          </span>
          <Separator className="" />
          {!isLoadingMembers ? (
            <div className="flex flex-col items-start gap-y-2 w-full ">
              {boardMembers !== undefined &&
                boardMembers.boardMembers.map((user:any, index:any) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-x-2 border border-neutral-700[0.3] rounded-md p-2 w-full bg-neutral-900/30 justify-between"
                  >
                    <div className="flex flex-row gap-x-2 items-center ">
                      <Avatar className="h-6 w-6 ">
                        <AvatarImage src={user.user.profileImage ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      {user.user.name}
                    </div>
                    <div className="flex flex-row border border-neutral-700/[0.2] bg-neutral-900/30 p-1 rounded-md cursor-pointer text-sm">
                      {user.role}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-y-2 w-full ">
              <div className="flex flex-col items-start gap-y-2 w-full ">
                <span className="text-md font-medium text-muted-foreground ">
                  Loading...
                </span>
                <Separator className="" />
              </div>
            </div>
          )}
        </div>

        {users.length > 0 && (
          <div className="flex flex-col items-start gap-y-2 w-full">
            <span className="text-md font-medium text-muted-foreground ">
              New Members
            </span>
            <Separator className="" />
            <div className="flex flex-col items-start gap-y-2 w-full ">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center gap-x-2 border border-neutral-700[0.3] rounded-md p-2 w-full bg-neutral-900/30 justify-between"
                >
                  <div className="flex flex-row gap-x-2 items-center ">
                    <Avatar className="h-6 w-6 ">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {user.label}
                  </div>
                  <div className="self-center place-content-end ">
                    <MdCancel
                      className="h-4 w-4 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setValue(
                          "users",
                          users.filter((u) => u.value !== user.value),
                          { shouldValidate: true }
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
     
        <div>
          <span className="text-md font-medium text-muted-foreground pb-1">Link to share</span>
          <div className="flex flex-row items-center gap-x-2">
            <Input placeholder="https://pangea.io/tasks/123" value={inviteLink} />  
            <div className="rounded-md p-3  border border-neutral-700/[0.2] bg-neutral-950  text-xs text-neutral-500 flex flex-row items-center gap-x-1 cursor-pointer" onClick={handleCopy} aria-disabled={copy}>
              {copy ? <Check size={16} className="text-neutral-500" /> : <Copy size={16} className="text-neutral-500" />}
              

            </div>
          </div>
        </div>

        <div className="flex flex-xol gap-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
