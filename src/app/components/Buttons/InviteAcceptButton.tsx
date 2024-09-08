"use client";
import { acceptInvitation } from "@/actions/createInvitaion";
import { Button } from "@/components/ui/button";
export const InviteAcceptButton = ({boardId}: {boardId: string}) => {
  const handleClick = async() => {
    await acceptInvitation(boardId);
  };
  return (
    <Button className=" rounded-md bg-blue-600 px-8 py-2 text-sm font-semibold text-neutral-300 hover:bg-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10 hover:bg-blue-700/60 hover:shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] trasition-all duration-300 ease-in-out mt-4" onClick={handleClick}>
      Accept Invite
    </Button>
  );
};
