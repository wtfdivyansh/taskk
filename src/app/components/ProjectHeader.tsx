"use client"

import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function ProjectHeader({name}: {name: string}) {
    const [starred, setStarred] = useState(false)
    const pathname = usePathname()
  return (
    <div className="flex flex-col gap-y-2 mt-4">
      <div className="text-4xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex  border-b bg-[#0F1011] items-center justify-between">
        <div className="flex flex-row items-center">
          <ChevronLeft
            className="text-neutral-300 cursor-pointer"
            onClick={() => window.history.back()}
          />
          <ChevronRight
            className="text-neutral-300 cursor-pointer"
            onClick={() => window.history.forward()}
          />

          <h1 className="text-xl font-semibold  text-neutral-300">
            {pathname.includes("/tasks") && (
              <h1 className="text-xl font-semibold  text-neutral-300 px-2">
                {name}
              </h1>
            )}
          </h1>
        </div>
        <div className="flex flex-row gap-x-4">
          {!starred ? (
            <div onClick={() => setStarred(true)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9083 5.85835C13.1083 6.26668 13.6416 6.65835 14.0916 6.73335L16.7499 7.17501C18.4499 7.45835 18.8499 8.69168 17.6249 9.90835L15.5583 11.975C15.2083 12.325 15.0166 13 15.1249 13.4833L15.7166 16.0417C16.1833 18.0667 15.1083 18.85 13.3166 17.7917L10.8249 16.3167C10.3749 16.05 9.63326 16.05 9.17492 16.3167L6.68326 17.7917C4.89992 18.85 3.81659 18.0583 4.28326 16.0417L4.87492 13.4833C4.98326 13 4.79159 12.325 4.44159 11.975L2.37492 9.90835C1.15826 8.69168 1.54992 7.45835 3.24992 7.17501L5.90826 6.73335C6.34992 6.65835 6.88326 6.26668 7.08326 5.85835L8.54992 2.92501C9.34992 1.33335 10.6499 1.33335 11.4416 2.92501L12.9083 5.85835Z"
                  stroke="#636363"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div onClick={() => setStarred(false)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="orange"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9083 5.85835C13.1083 6.26668 13.6416 6.65835 14.0916 6.73335L16.7499 7.17501C18.4499 7.45835 18.8499 8.69168 17.6249 9.90835L15.5583 11.975C15.2083 12.325 15.0166 13 15.1249 13.4833L15.7166 16.0417C16.1833 18.0667 15.1083 18.85 13.3166 17.7917L10.8249 16.3167C10.3749 16.05 9.63326 16.05 9.17492 16.3167L6.68326 17.7917C4.89992 18.85 3.81659 18.0583 4.28326 16.0417L4.87492 13.4833C4.98326 13 4.79159 12.325 4.44159 11.975L2.37492 9.90835C1.15826 8.69168 1.54992 7.45835 3.24992 7.17501L5.90826 6.73335C6.34992 6.65835 6.88326 6.26668 7.08326 5.85835L8.54992 2.92501C9.34992 1.33335 10.6499 1.33335 11.4416 2.92501L12.9083 5.85835Z"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
           </div>

          )}
          <Ellipsis />
        </div>
      </div>
    </div>
  );
}