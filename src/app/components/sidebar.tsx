import { currentUser } from "@clerk/nextjs/server";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, User } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import SidebarList from "./sidebarList";

export default async function Sidebar() {
  const user = await currentUser()
  return (
    <div className="h-full w-72 bg-neutral-950 flex flex-col gap-x-2 gap-y-2">
      <div className="flex flex-row items-start justity-start mx-2  mt-6  px-6 ">
        <div className="flex flex-row items-center space-x-1 w-8 h-8 px-2 py-2 bg-neutral-950 shadow-[0_1px_0_0_theme(colors.white/17%)_inset,0_0_0_1px_theme(colors.white/5%)] rounded-md">
          <svg
            fill="#ffffff"
            height="800px"
            width="800px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z"
                />
              </g>
            </g>
          </svg>
        </div>
        <span className="font-bold text-lg  px-2   bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600   ">
          SaveBox
        </span>
      </div>
      <div className="mt-4">
        <Popover>
          <PopoverTrigger className="relative bg-neutral-900 flex justify-between  border border-neutral-700/[0.3] rounded-xl w-[90%] h-16  flex-col mx-auto  px-2 py-3 shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none">
            <div className="flex flex-row w-full ">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={user?.imageUrl}
                  alt="@shadcn"
                  className="rounded-xl"
                />

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-start">
                <span className="font-normal text-sm  mx-1  text-zinc-300   ">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="font-bold text-[10px] px-1 text-start  text-muted-foreground/50   ">
                  {"@" + user?.username}
                </span>
              </div>
              <div className="flex flex-row justify-end mx-auto">
                <ChevronDown className="w-6 h-6 text-zinc-500 place-self-center absolute -right-5 top-50  mx-8" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-neutral-900 border border-neutral-700/[0.2] rounded-xl shadow-md h-28 w-64 mt-1">
            <div className="flex flex-col justify-start items-start gap-y-1">
              <button className="flex flex-row items-center  w-60 -mx-2 h-10 px-2 gap-x-2  text-sm font-medium text-zinc-200  hover:bg-zinc-950 rounded-xl hover:border-neutral-700/[0.5] hover:shadow-[0_2px_7px_1px_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)]  ">
                <User size={16} />
                View Profile
              </button>
              
              <SignOutButton>
                <button className="flex flex-row items-center  w-60 -mx-2 h-10 px-2 gap-x-2  text-sm font-medium text-zinc-200  hover:bg-zinc-950 rounded-xl hover:border-neutral-700/[0.5] hover:shadow-[0_2px_5px_0.5px_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/5%)]  ">
                  <LogOut size={16} />
                  Logout
                </button>
              </SignOutButton>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <SidebarList />
    </div>
  );
};