"use client";
import { Separator } from "@/components/ui/separator";

import { usePathname } from "next/navigation";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarList } from "@/lib/constant";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const SidebarSection =() =>{
  const pathName = usePathname()
    return(
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <svg
          fill="#ffffff"
          height="40px"
          width="40px"
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
        <p className="text-2xl">Taskk</p>
      </div>
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {sidebarList.map((item) => (
            <li className="cursor-pointer my-[5px]">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D]",
                  item.href === pathName ? "bg-[#1D1D1D]" : ""
                )}
              >
                <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
                  <item.icon
                    className="w-6 h-6"
                    selected={item.href === pathName}
                  />
                  <span
                    className={cn(
                      "font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32",
                      item.href === pathName
                        ? "text-[#9D9D9D]"
                        : "text-[#545454]"
                    )}
                  >
                    {item.name}
                  </span>
                </div>
                {}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Separator className="w-full" />
      <p className="w-full text-[#9D9D9D] font-bold  ">Recent Projects</p>
    </div>
    )
}
const Sidebar = () => {
  return (
    <div className="full">
      <div className="lg:block hidden h-full">
        {" "}
        <SidebarSection />
      </div>
    </div>
  );
};

export default Sidebar;
