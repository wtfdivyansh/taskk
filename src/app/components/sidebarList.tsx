"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarList } from "@/lib/constant"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"
import { cn } from "@/lib/utils"

export default function SidebarList() {
    const pathname = usePathname()
 
  return (
    <div className="flex flex-col gap-y-1 ">
      {sidebarList.map((item: { name: string; icon: any; href: string }) => (
        <Link href={item.href} key={item.name}>
          <div
            className={cn(
              "flex items-center w-[260px] justify-between rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-neutral-900 hover:border-neutral-700/[0.3] hover:border mx-3 hover:scale-102 group ",
              {
                "bg-neutral-900 border-neutral-700/[0.3] border":
                  pathname === item.href,
              }
            )}
          >
            <div className="flex items-center gap-x-2">
              <item.icon
                selected={item.href === pathname}
                className={cn(
                  `w-5 h-5 dark:fill-[#353346] dark:stroke-[#353346] fill-[#BABABB] stroke-[#BABABB] group-hover:fill-white group-hover:stroke-bg-zinc-200  hover:fill-white hover:stroke-bg-zinc-200`,
                  {
                    "dark:group-hover:fill-white transition-all dark:fill-white  group-hover:fill-white group-hover:stroke-bg-zinc-200":
                      pathname === item.href,
                  }
                )}
              />
              <span className="text-gray-900 dark:text-white">{item.name}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}