"use client"
import { Ellipsis, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarSection } from "./sidebar";

export function ProjectHeader({name}: {name: string}) {

 const pathname = usePathname()
  return (
    <div className="flex flex-col gap-y-2 ">
      <div className="text-4xl sticky top-0 z-[10] p-2 bg-background/50 backdrop-blur-lg flex  border-b bg-[#0F1011] items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild className="ml-2 ">
                <Button variant={"ghost"} className="mt-[2px]">
                  <Menu/>
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"} className="p-0 w-fit h-full">
                <SidebarSection />
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="text-xl font-semibold  text-neutral-300">
            {pathname.includes("/tasks") && (
              <h1 className="text-xl font-semibold  text-neutral-300 px-2">
                {name}
              </h1>
            )}
          </h1>
        </div>
        <div className="flex flex-row gap-x-4">
          <Ellipsis />
        </div>
      </div>
    </div>
  );
}